import { exists, readdir } from "fs/promises";
import path from "path";

import { postgres } from "@project-arcturus/database";

import Markdown from "../../../models/Markdown/index.js";
import log from "../../../lib/log.js";

// Add verbose logging to this seed function
export async function seed() {
  if (!postgres.envOk()) {
    throw new Error("Database environment variables not set");
  }

  const pgPool = postgres.getPool();

  const pathToPostsDir = path.resolve(process.cwd(), "..", "..", "posts");

  if (!(await exists(pathToPostsDir))) {
    throw new Error("Posts directory does not exist");
  }

  const posts = await readdir(pathToPostsDir, {
    withFileTypes: true,
    encoding: "utf8",
  });

  const mds = await Promise.all(
    posts
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
      .map(async (file) => {
        const bfile = Bun.file(
          path.resolve(path.join(file.parentPath || file.path, file.name))
        );
        const fileContents = await bfile.text();
        const markdown = new Markdown(fileContents);
        return markdown;
      })
  );

  for (const md of mds) {
    try {

    } catch(e) {
      log.error(e);
    }
    const r = await postgres.runQuery(
      pgPool,
      `
        INSERT INTO posts (
            slug, title, description, author, category, arch_category, search_terms, genres, release_date, estimated_reading_time, media, content
        ) values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        ) ON CONFLICT SET 
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        author = EXCLUDED.author,
        category = EXCLUDED.category,
        arch_category = EXCLUDED.arch_category,
        search_terms = EXCLUDED.search_terms,
        genres = EXCLUDED.genres,
        release_date = EXCLUDED.release_date,
        estimated_reading_time = EXCLUDED.estimated_reading_time,
        media = EXCLUDED.media,
        content = EXCLUDED.content;
        `,
        [
          md.getAttribute("slug"),
          md.getAttribute("title"),
          md.getAttribute("description"),
          md.getAttribute("author"),
          md.getAttribute("category"),
          md.getAttribute("arch_category"),
          md.getAttribute("search_terms"),
          md.getAttribute("genres"),
          md.getAttribute("release_date"),
          md.getAttribute("estimated_reading_time"),
          md.getAttribute("media"),
          md.body,
        ]
    );
  }
}

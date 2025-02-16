import { postgres } from "@project-arcturus/database";

import log from "../../../lib/log.js";
import PostsLoader from "../../../models/Posts/Loader.js";

export async function seed() {
  log.info("Seeding database...");

  if (!postgres.envOk()) {
    log.error("Database environment variables not set");
    throw new Error("Database environment variables not set");
  }

  log.info("Setting up database connection...");
  const pgPool = postgres.getPool();

  try {
    await seedPostsFromFs(pgPool);
  } catch (e) {
    log.error(e);
    log.error("Failed to load posts from filesystem");
  }

  log.info("Closing database connection...");
  await pgPool.end();
}

async function seedPostsFromFs(pgPool) {
  log.info("Loading posts from filesystem...");
  const posts = await new PostsLoader().loadFromFs();

  log.info("Posts: %d", posts.length);

  for (const post of posts) {
    try {
      log.info("Processing post %s", post.getAttribute("slug"));

      if (!post.valid()) {
        log.error("Failed to write %s to database", post.getAttribute("slug"));
        log.error("Post is invalid, skipping.");
        continue;
      }

      log.warn("Writing post %s to database", post.getAttribute("slug"));

      const queryResult = await postgres.runQuery(
        pgPool,
        `
          INSERT INTO posts (
              slug, title, description, author, category, arch_category, search_terms, genres, release_date, estimated_reading_time, media, content, is_test_data, visible
          ) values (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          ) ON CONFLICT DO NOTHING; 
          `,
        [
          post.getAttribute("slug"),
          post.getAttribute("title"),
          post.getAttribute("description"),
          post.getAttribute("author") && post.getAttribute("author").length
            ? post.getAttribute("author")[0]
            : {
                first_name: "Test",
                last_name: "User",
                email: `test-${i}@test.com`,
                github: `test-${i}@github.com`,
                avatar: "https://i.pravatar.cc/150?img=1",
                nickname: "Test User",
                id: `test-${i}`,
              },
          post.getAttribute("category"),
          post.getAttribute("archCategory"),
          post.getAttribute("searchTerms"),
          post.getAttribute("genres"),
          post.getAttribute("releaseDate"),
          post.getAttribute("estimatedReadingTime"),
          post.getAttribute("media") && post.getAttribute("media").length
            ? post.getAttribute("media")[0]
            : {
                source: "test",
                alt: "test",
                aspect_ratio: "1/1",
              },
          post.body,
          false,
          Boolean(post.getAttribute("visible"))
        ]
      );

      if (queryResult.rowCount !== 1) {
        throw new Error("Failed to write post to database");
      }

      log.info(
        "Successfully wrote post %s to database",
        post.getAttribute("slug")
      );
    } catch (e) {
      log.error("Failed to write %s to database", post.getAttribute("slug"));
      if (e instanceof Error) {
        log.error("####################################################");
        log.error("Error: %s", e.name);
        log.error("Message: %s", e.message);
        log.error("Stack: %s", e.stack);
        log.error("####################################################");
      }
      log.error("Was able to fail gracefully.");
      log.error("Recovering, attempting next write.");
    }
  }
}

async function seedTestPosts(pgPool) {
  /** Seed a bunch of test data */
  for (let i = 0; i < 100; i++) {
    try {
      log.info("Processing post %s", `test-${i}`);

      const queryResult = await postgres.runQuery(
        pgPool,
        `
            INSERT INTO posts (
                slug, title, description, author, category, arch_category, search_terms, genres, release_date, estimated_reading_time, media, content, is_test_data
            ) values (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
            ) ON CONFLICT DO NOTHING; 
            `,
        [
          `test-${i}`,
          `Test Post ${i}`,
          `Test Post ${i}`,
          {
            first_name: "Test",
            last_name: "User",
            email: `test-${i}@test.com`,
            github: `test-${i}@github.com`,
            avatar: "https://i.pravatar.cc/150?img=1",
            nickname: "Test User",
            id: `test-${i}`,
          },
          "test",
          "test",
          ["test"],
          ["test"],
          "test",
          "test",
          {
            source: "test",
            alt: "test",
            aspect_ratio: "1/1",
          },
          "test",
          true,
        ]
      );

      if (queryResult.rowCount !== 1) {
        throw new Error("Failed to write test post to database");
      }

      log.info("Successfully wrote test post %s to database", `test-${i}`);
    } catch (e) {
      log.error("Failed to write test post %s to database", `test-${i}`);
      if (e instanceof Error) {
        log.error("####################################################");
        log.error("Error: %s", e.name);
        log.error("Message: %s", e.message);
        log.error("Stack: %s", e.stack);
        log.error("####################################################");
      }
      log.error("Was able to fail gracefully.");
      log.error("Recovering, attempting next write.");
    }
  }
}

async function seedTestUsers(pgPool) {
  for (let i = 0; i < 100; i++) {
    try {
      log.info("Processing user %s", `test-${i}`);

      const queryResult = await postgres.runQuery(
        pgPool,
        `
            INSERT INTO users (
                email, is_test_data
            ) values (
                $1, $2
            ) ON CONFLICT DO NOTHING; 
            `,
        [`test-${i}@test.com`, true]
      );

      if (queryResult.rowCount !== 1) {
        throw new Error("Failed to write test user to database");
      }

      log.info("Successfully wrote test user %s to database", `test-${i}`);
    } catch (e) {
      log.error("Failed to write test user %s to database", `test-${i}`);
      if (e instanceof Error) {
        log.error("####################################################");
        log.error("Error: %s", e.name);
        log.error("Message: %s", e.message);
        log.error("Stack: %s", e.stack);
        log.error("####################################################");
      }
      log.error("Was able to fail gracefully.");
      log.error("Recovering, attempting next write.");
    }
  }
}

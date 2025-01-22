import { postgres } from "@project-arcturus/database";

import log from "../../../lib/log.js";
import PostsLoader from "../../../models/Posts/Loader.js";

export async function seed() {

  log.info("Seeding database...");

  if (!postgres.envOk()) {
    log.error("Database environment variables not set");
    throw new Error("Database environment variables not set");
  }

  log.info('Setting up database connection...');
  const pgPool = postgres.getPool();

  log.info('Loading posts from filesystem...');
  const posts = await new PostsLoader().loadFromFs();


  log.info('Posts: %d', posts.length);

  for (const post of posts) {
    try {
      log.info('Processing post %s', post.getAttribute('slug'));

      if (!post.valid()) {
        log.error('Failed to write %s to database', post.getAttribute('slug'));
        log.error('Post is invalid, skipping.');
        continue;
      }

      log.warn('Writing post %s to database', post.getAttribute('slug'));

      const queryResult = await postgres.runQuery(
        pgPool,
        `
          INSERT INTO posts (
              slug, title, description, author, category, arch_category, search_terms, genres, release_date, estimated_reading_time, media, content
          ) values (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
          ) ON CONFLICT DO NOTHING; 
          `,
          [
            post.getAttribute("slug"),
            post.getAttribute("title"),
            post.getAttribute("description"),
            post.getAttribute("author") && post.getAttribute("author").length ? post.getAttribute("author")[0] : {},
            post.getAttribute("category"),
            post.getAttribute("archCategory"),
            post.getAttribute("searchTerms"),
            post.getAttribute("genres"),
            post.getAttribute("releaseDate"),
            post.getAttribute("estimatedReadingTime"),
            post.getAttribute("media") && post.getAttribute("media").length ? post.getAttribute("media")[0] : {},
            post.body,
          ]
      );

      if (queryResult.rowCount !== 1) {
        throw new Error("Failed to write post to database");
      }

      log.info('Successfully wrote post %s to database', post.getAttribute('slug'));

    } catch(e) {
      log.error('Failed to write %s to database', post.getAttribute('slug'));
      if (e instanceof Error) {
        log.error('####################################################');
        log.error('Error: %s', e.name);
        log.error('Message: %s', e.message);
        log.error('Stack: %s', e.stack);
        log.error('####################################################');
      }
      log.error('Was able to fail gracefully.');
      log.error('Recovering, attempting next write.')
    }
  }

  await pgPool.end();
}

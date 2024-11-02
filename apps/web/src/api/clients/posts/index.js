import frontmatter from 'front-matter';
import { LRUCache } from 'lru-cache';
import { Attempt, AttemptState } from 'sleepydogs';

import { error } from '../../../lib/log/index.js';

class PostLibrary {
  static #baseUrl = 'https://dotafts-server.shuttleapp.rs/';
  static #indexPath = 'api/files/dir/index';

  /**
   * @type {LRUCache<string, { key: string; metadata: any, article: string, pathFragment: string }>}
   */
  #cache = new LRUCache({
    max: 100,
    maxSize: 100,
    sizeCalculation(v, k) {
      return 1;
    },
    ttl: 1000 * 60 * 60 * 24 * 7,
    allowStale: false
  });

  async loadPost(postUrlPathFragment) {
    const headers = { Accept: 'text/markdown' };
    const mode = 'cors';
    const method = 'GET';
    const options = { headers, mode, method };
    const response = await fetch(PostLibrary.#baseUrl + postUrlPathFragment, options);
    const file = await response.text();
    const parsed = frontmatter(file);

    const key = parsed.attributes?.slug;
    const data = {
      key,
      metadata: parsed.attributes,
      article: parsed.body,
      pathFragment: postUrlPathFragment
    };

    if (key) {
      this.#cache.set(key, data);
    }

    return data;
  }

  async loadAllPosts() {
    const headers = { Accept: 'application/json' };
    const mode = 'cors';
    const method = 'GET';
    const options = { headers, mode, method };
    const url = PostLibrary.#baseUrl + PostLibrary.#indexPath;
    const fileListResponse = await fetch(url, options);
    const fileList = await fileListResponse.json();
    const promises =
      fileList?.data
        ?.filter((file) => file.endsWith('.md'))
        .map((filePath) => this.loadPost(filePath)) || [];

    if (promises.length === 0) {
      error(new Error('Failed to load posts'));
    }

    const callback = async () => await Promise.all(promises);

    const $ = new Attempt({
      callback,
      retries: 3
    });

    await $.run();

    if ($.state === AttemptState.FAILED) {
      error(new Error('Failed to load posts. Attempts exceeded specified max.'));
    }
  }

  get(slug) {
    return this.#cache.get(slug);
  }

  getAll() {
    return Array.from(this.#cache.entries());
  }
}

export default new PostLibrary();

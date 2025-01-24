import { LRUCache } from 'lru-cache';
import { Attempt, AttemptState } from 'sleepydogs';

import { error } from '../../../lib/log/index.js';

class PostLibrary {
  /**
   * Use the docker container name to resolve the host from within the shared container network
   */
  static #postsApiEndpoint = process.env.EXEC_CONTEXT === 'docker' ? process.env.DOCKER_POSTS_API_ENDPOINT : process.env.LOCAL_POSTS_API_ENDPOINT;
  static #postsApiEndpointReadAll = PostLibrary.#postsApiEndpoint + 'api/posts';

  /**
   * @type {LRUCache<string, { key: string; metadata: any, article: string, pathFragment: string }>}
   */
  #postsCache = new LRUCache({
    max: 100,
    maxSize: 100,
    sizeCalculation(v, k) {
      return 1;
    },
    ttl: 1000 * 60 * 60 * 24 * 7,
    allowStale: false
  });

  async loadPost(postUrlPathFragment) {
    const options = this.#createDefaultHttpOptions();
    const response = await fetch(PostLibrary.#postsApiEndpoint + postUrlPathFragment, options);
    const post = await response.json();

    const key = post.id;
    const data = {
      key,
      metadata: { ...post },
      article: post.body,
      pathFragment: postUrlPathFragment
    };

    if (key) {
      this.#postsCache.set(key, data);
    }

    return data;
  }

  async loadAllPosts() {
    const options = this.#createDefaultHttpOptions();
    const fileListResponse = await fetch(PostLibrary.#postsApiEndpointReadAll, options);
    const fileList = await fileListResponse.json();
    const promises = fileList?.data.map(({ id }) => this.loadPost(`/id/${id}`)) || [];

    if (promises.length === 0) {
      error(new Error('Failed to load posts'));
    }

    const $postsAttempt = new Attempt({
      callback: async () => await Promise.all(promises),
      retries: 10,
      onError: (e) => {
        error(e);
        throw e;
      }
    });

    await $postsAttempt.run();

    if ($postsAttempt.state === AttemptState.FAILED) {
      const e = new Error('Failed to load posts. Attempts exceeded specified max.');
      error(e);
      throw e;
    }
  }

  get(slug) {
    return this.#postsCache.get(slug);
  }

  getAll() {
    return Array.from(this.#postsCache.entries());
  }

  #createDefaultHttpOptions(suppliedOptions) {
    const headers = { Accept: 'application/json' };
    const mode = 'cors';
    const method = 'GET';
    const options = { headers, mode, method };
    return { ...options, ...suppliedOptions };
  }
}

export default new PostLibrary();

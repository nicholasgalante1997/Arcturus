import { LazySingleton } from 'sleepydogs';
import PostsCacheLazySingleton from './cache.js';
import { error, info } from '../../../lib/log/index.js';

class PostsAPIClient {
  static #postsApiEndpoint =
    process.env.EXEC_CONTEXT === 'docker'
      ? process.env.DOCKER_POSTS_API_ENDPOINT
      : process.env.LOCAL_POSTS_API_ENDPOINT;
  static #postsApiEndpointReadAll = PostsAPIClient.#postsApiEndpoint + 'api/posts';
  static #getPostApiEndpointReadOnId = (id) => PostsAPIClient.#postsApiEndpoint + `api/posts/id/${id}`;

  #cache;

  constructor() {
    this.#cache = PostsCacheLazySingleton.getInstance();
  }

  getOneFromCacheSync(id) {
    try {
      return this.#cache.get(id);
    } catch (e) {
      error(e);
      return null;
    }
  }

  getAllFromCacheSync() {
    return this.#cache.getAll();
  }

  async getOneFromAnywhereAsync(id) {
    const cached = this.getOneFromCacheSync(id);
    if (cached) {
      return cached;
    }
    return this.fetchOne(id);
  }

  async fetchOne(id) {
    try {
      const options = this.#createDefaultHttpOptions();
      const url = new URL(PostsAPIClient.#getPostApiEndpointReadOnId(id));
      const response = await fetch(url, options);
      const post = await response.json();
      
      if (post) {
        this.#cache.add(post.id, this.#createPostObjectFromPost(post));
        return this.#createPostObjectFromPost(post);
      }

      return null;
    } catch (e) {
      error(e);
      return null;
    }
  }

  async fetchAll() {
    const options = this.#createDefaultHttpOptions();
    const url = new URL(PostsAPIClient.#postsApiEndpointReadAll);
    const response = await fetch(url, options);
    const posts = await response.json();
    for (const post of posts) {
      this.#cache.add(post.id, this.#createPostObjectFromPost(post));
    }
  }

  #createDefaultHttpOptions(suppliedOptions = {}) {
    const headers = { Accept: 'application/json' };
    const mode = 'cors';
    const method = 'GET';
    const options = { headers, mode, method };
    return { ...options, ...suppliedOptions };
  }

  #createPostObjectFromPost(post) {
    return {
      key: post?.id,
      metadata: { ...post },
      article: post?.content,
      pathFragment: post?.slug
    };
  }
}

export default LazySingleton(PostsAPIClient);

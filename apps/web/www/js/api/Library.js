import frontmatter from 'front-matter';
import { Attempt, AttemptState } from 'sleepydogs';

import { error, info } from '../log/index.js'

class PostLibrary {
  static #baseUrl = 'https://dotafts-server.shuttleapp.rs/';
  static #indexPath = 'api/files/dir/index';

  #cache = new Map();

  async loadPost(postUrlPathFragment) {
    const headers = { Accept: 'text/markdown' };
    const mode = 'no-cors';
    const method = 'GET';
    const options = { headers, mode, method };
    const response = await fetch(PostLibrary.#baseUrl + postUrlPathFragment, options);
    const file = await response.text();
    const parsed = frontmatter(file);

    const key = parsed.attributes?.slug;
    const data = {
      metadata: parsed.attributes,
      article: parsed.body,
      pathFragment: postUrlPathFragment
    };

    this.#cache.set(key, data);
  }

  async loadPosts() {
    const headers = { Accept: 'application/json' };
    const mode = 'no-cors';
    const method = 'GET';
    const options = { headers, mode, method };

    const url = PostLibrary.#baseUrl + PostLibrary.#indexPath;

    console.log({ url, options }); 

    const fileListResponse = await fetch(url, options);

    info(fileListResponse);

    const fileList = await fileListResponse.json();

    const promises = fileList?.data?.filter((file) => file.endsWith('.md')).map((filePath) => this.loadPost(filePath)) || [];

    if (promises.length === 0) {
      error(new Error('Failed to load posts'))
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
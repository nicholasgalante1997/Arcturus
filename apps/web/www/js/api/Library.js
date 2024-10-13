import frontmatter from 'front-matter';
import { Attempt, AttemptState } from 'sleepydogs';

class PostLibrary {
  static #baseUrl = 'https://dotafts-server.shuttleapp.rs/';

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

  async loadPosts(postUrlPathFragments) {
    const promises = postUrlPathFragments.map((postUrlPathFragment) =>
      this.loadPost(postUrlPathFragment)
    );
    const callback = async () => await Promise.all(promises);
    const $ = new Attempt({
      callback,
      retries: 3
    });

    await $.run();

    if ($.state === AttemptState.FAILED) {
    }
  }

  get(slug) {
    return this.#cache.get(slug);
  }
}

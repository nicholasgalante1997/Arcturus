import { Posts } from '../../api/index.js';
import WebDependencyManager from '../../lib/dependencies/index.js';
import { error, info } from '../../lib/log/index.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
export default async function homePageHandler(req, res, next) {
  const api = Posts.PostsAPIClientLazySingleton.getInstance();
  let posts = api.getAllFromCacheSync();

  /**
   * For now, we can disable this block
   */
  const failOnEmpty = false;
  if (failOnEmpty && posts.length === 0) {
    info('No posts found in the cache!');
    try {
      await api.fetchAll();
      posts = api.getAllFromCacheSync();
    } catch (e) {
      error('An error has been thrown in attempt to fetch all posts');
      error(e);
      next(e);
    }

    if (posts.length === 0) {
      error('Failed to fetch any posts');
      next(new Error('FailedToFetchPosts'));
    }
  }

  const depLottie = WebDependencyManager.getDependency('lottie-web');
  const depWebVitals = WebDependencyManager.getDependency('web-vitals');
  const depPico = WebDependencyManager.getDependency('@supra-dev/pico');
  const depLodashMerge = WebDependencyManager.getDependency('lodash.merge');

  const imports = [
    {
      name: depLottie.dependency,
      url: depLottie?.cdn?.links?.at(0)
    },
    {
      name: depWebVitals?.dependency,
      url: depWebVitals?.cdn?.links?.at(0)
    },
    {
      name: depPico?.dependency,
      url: depPico?.cdn?.links?.at(0)
    },
    {
      name: depLodashMerge?.dependency,
      url: depLodashMerge?.cdn?.links?.at(0)
    }
  ];

  const $posts = posts.map((data) => ({
    estimatedReadingTime: data?.metadata?.estimatedReadingTime || '5 mins',
    title: data?.metadata?.title,
    genres: data?.metadata?.genres || [],
    description: data?.metadata?.description,
    author: data?.metadata?.author,
    href: '/posts/' + data?.metadata?.id,
    key: data?.metadata?.id,
    id: data?.metadata?.id
  }));

  try {
    res.status(200).render('index', {
      title: 'Project Arcturus',
      description: 'A content microengine, maintained by the team at <b>Arcturus</b>',
      imports,
      posts: $posts,
      css: {
        include: {
          post: false
        }
      },
      state: JSON.stringify({
        posts: $posts
      })
    });
    return;
  } catch (e) {
    error('An error has been thrown in attempt to render `index`');
    error(e);
    next(e);
  }
}

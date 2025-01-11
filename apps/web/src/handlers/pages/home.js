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
  const posts = Posts.getAll();

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

  const categories = Array.from(
    new Set([
      ...posts
        .map(([_uuid, data]) => {
          const { metadata, pathFragment } = data;
          info('Serving article from', pathFragment);
          return metadata.genres;
        })
        .flat()
        .filter(Boolean)
    ])
  ).map((label) => ({
    label,
    selected: label === 'Software Engineering'
  }));

  const $posts = posts.map(([k, data]) => ({
    estimatedReadingTime: data?.metadata?.estimatedReadingTime || '5 mins',
    title: data?.metadata?.title,
    genres: data?.metadata?.genres || [],
    description: data?.metadata?.description,
    author: data?.metadata?.author?.length && data?.metadata?.author[0],
    href: '/posts/' + k,
    key: k,
    id: k,
    visibility: data?.metadata?.genres?.includes('Software Engineering') ? 'visible' : 'hidden'
  }));

  try {
    res.status(200).render('index', {
      title: 'Project Arcturus',
      description: 'A content microengine, maintained by the team at <b>Arcturus</b>',
      imports,
      categories,
      posts: $posts,
      css: {
        include: {
          post: false
        }
      },
      state: JSON.stringify({
        posts: $posts,
        categories
      })
    });
    return;
  } catch (e) {
    error('An error has been thrown in attempt to render `index`');
    error(e);
    next(e);
  }
}

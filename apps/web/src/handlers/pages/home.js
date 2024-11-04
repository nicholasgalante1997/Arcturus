import { Posts } from '../../api/index.js';
import WebDependencyManager  from '../../lib/dependencies/index.js';
import { error } from '../../lib/log/index.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
export default async function homePageHandler(req, res, next) {
  const posts = Posts.getAll();
  try {
    res.status(200).render('index', {
      title: 'Project Arcturus',
      description: 'A content microengine, maintained by the team at Arcturus',
      imports: [
        {
          name: WebDependencyManager.getDependency('front-matter')?.dependency,
          url: WebDependencyManager.getDependency('front-matter')?.cdn?.links?.at(0)
        },
        {
          name: WebDependencyManager.getDependency('lottie-web')?.dependency,
          url: WebDependencyManager.getDependency('lottie-web')?.cdn?.links?.at(0)
        },
        {
          name: WebDependencyManager.getDependency('web-vitals')?.dependency,
          url: WebDependencyManager.getDependency('web-vitals')?.cdn?.links?.at(0)
        },
        {
          name: WebDependencyManager.getDependency('sleepydogs')?.dependency,
          url: WebDependencyManager.getDependency('sleepydogs')?.cdn?.links?.at(0)
        }
      ],
      posts: posts.map(([k, data]) => ({
        estimatedReadingTime: data?.metadata?.estimatedReadingTime || '5 mins',
        title: data?.metadata?.title,
        genres: data?.metadata?.genres || [],
        description: data?.metadata?.description,
        author: data?.metadata?.author,
        href: '/posts/' + k,
        key: k
      })),
      css: {
        include: {
          post: false
        }
      }
    });
    return;
  } catch(e) {
    error('An error has been thrown in attempt to render `index`');
    error(e);
    next(e)
  }
}

import { postsLibClient as Posts } from '../../api/index.js';
import WebDependencyManager  from '../../lib/dependencies/index.js';
import { error } from '../../lib/log/index.js';
import MarkdownHelper from '../../lib/markdown/index.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
export default async function articlePageHandler(req, res, next) {

  const params = req.params;
  const id = params.id;
  
  if (!id) {
    next(new Error('MissingPostID'));
    return;
  }

  const post = Posts.get(id);

  if (!post) {
    next(new Error('UnableToFindPostWithKey'));
    return;
  }

  try {
    res.status(200).render('post', {
      title: 'Project Arcturus - ' + post.metadata?.title,
      description: post.metadata?.description,
      imports: [
        {
          name: WebDependencyManager.getDependency('web-vitals')?.dependency,
          url: WebDependencyManager.getDependency('web-vitals')?.cdn?.links?.at(0)
        },
        {
          name: WebDependencyManager.getDependency('sleepydogs')?.dependency,
          url: WebDependencyManager.getDependency('sleepydogs')?.cdn?.links?.at(0)
        }
      ],
      post: {
        series: post.metadata?.series,
        title: post.metadata?.title,
        description: post.metadata?.description,
        releaseDate: post.metadata?.releaseDate,
        estimatedReadingTime: post.metadata?.estimatedReadingTime,
        author: post.metadata?.author,
        image: {
            src: post.metadata?.media?.source,
            alt: post.metadata?.media?.alt,
            publisherInfo: post.metadata?.media?.publisherInfo,
            aspectRatio: post.metadata?.media?.aspectRatio
        },
        body: await MarkdownHelper.convert(post.article)
      }
    });
    return;
  } catch(e) {
    error(e);
    next(e)
  }
}

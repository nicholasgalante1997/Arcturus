import { Posts } from '../../api/index.js';
import WebDependencyManager from '../../lib/dependencies/index.js';
import { error } from '../../lib/log/index.js';
import MarkdownHelper from '../../lib/markdown/index.js';

async function convertPostToEJSObject(post) {
  return {
    series: post.metadata?.series,
    title: post.metadata?.title,
    description: post.metadata?.description,
    releaseDate: post.metadata?.release_date,
    estimatedReadingTime: post.metadata?.estimated_reading_time,
    author: post.metadata?.author,
    image: {
      src: post.metadata?.media?.source,
      alt: post.metadata?.media?.alt,
      publisherInfo: post.metadata?.media?.publisherInfo,
      aspectRatio: post.metadata?.media?.aspectRatio
    },
    body: await MarkdownHelper.convert(post?.article || '')
  }
}

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

  const post = await Posts.PostsAPIClientLazySingleton.getInstance().getOneFromAnywhereAsync(id);

  if (!post) {
    next(new Error('UnableToFindPostWithKey'));
    return;
  }

  const title = 'Project Arcturus - ' + post.metadata?.title;
  const description = post.metadata?.description;
  const imports = [
    {
      name: WebDependencyManager.getDependency('web-vitals')?.dependency,
      url: WebDependencyManager.getDependency('web-vitals')?.cdn?.links?.at(0)
    },
    {
      name: WebDependencyManager.getDependency('sleepydogs')?.dependency,
      url: WebDependencyManager.getDependency('sleepydogs')?.cdn?.links?.at(0)
    }
  ];

  try {
    res.status(200).render('post', {
      title,
      description,
      imports,
      post: await convertPostToEJSObject(post)
    });
    return;
  } catch (e) {
    error(e);
    next(e);
  }
}

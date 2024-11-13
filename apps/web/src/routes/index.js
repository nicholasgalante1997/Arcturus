import { error } from '../lib/log/index.js';
import homePageRouter from './pages/home.js';
import postRouter from './pages/post.js';

/**
 * @param {import('express').Express} app
 */
export function setupWebRoutes(app) {
  app.use('/', homePageRouter);
  app.use('/posts', postRouter)
}

/**
 * @param {import('express').Express} app
 */
export function setupErrorHandler(app) {
  app.use((err, req, res, next) => {
    
    if (err instanceof Error) {
      error('Error %s', err?.name);
      error('Error Message %s', err?.message);
      error('Stack %s', err?.stack);
    } else {
      try {
        error(JSON.stringify(err));
      } catch(e) {
        error(e);
        error('Recursive JSON Exception');
      }
    }

    res.status(500).send('An error occurred');
  })
}

import path from 'node:path';

/**
 *
 * @param {import('express').Express} app
 */
export default function setupViewEngine(app) {
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(process.cwd(), 'views'));
}

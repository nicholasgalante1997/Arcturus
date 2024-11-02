import http from 'node:http';
import express from 'express';

import { info } from '../lib/log/index.js';

import setupStaticAssetRoutes from '../middleware/static-files.js';
import { setupErrorHandler, setupWebRoutes } from '../routes/index.js';
import setupViewEngine from '../lib/view/setup.js';
import setupMiddleware from '../middleware/index.js';

const app = express();

setupMiddleware(app);
setupStaticAssetRoutes(app);
setupWebRoutes(app);
setupViewEngine(app);
setupErrorHandler(app);

/**
 *
 * @param {import('express').Express} app
 * @param {number} port
 * @param {string} host
 * @param {() => void} callback
 */
export function run(
  app,
  port = 4040,
  host = '0.0.0.0',
  callback = () => info(`Server running on ${host}:${port}`)
) {
  return app.listen(port, host, callback);
}

export default http.createServer(app);

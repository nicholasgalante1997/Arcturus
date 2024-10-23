import express from 'express';

import { info } from '../lib/log/index.js';
import setupStaticAssetRoutes from '../middleware/static-files.js';

const app = express();

setupStaticAssetRoutes(app);

export function run(
  app,
  port = 4040,
  host = '0.0.0.0',
  callback = () => info(`Server running on ${host}:${port}`)
) {
  app.listen(port, host, callback);
}

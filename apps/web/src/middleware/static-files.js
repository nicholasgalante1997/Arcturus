import path from 'node:path';
import express from 'express';

export default function setupStaticAssetRoutes(app) {
  app.use('/assets', express.static(getAssetDir('assets')));
  app.use('/css', express.static(getAssetDir('css')));
  app.use('/js', express.static(getAssetDir('js')));
  return app;
}

function getAssetDir(dirname) {
  return path.resolve(process.cwd(), 'public', dirname);
}

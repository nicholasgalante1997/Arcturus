import path from 'node:path';
import express from 'express';

export default function setupStaticAssetRoutes(app) {
  app.use('/assets', express.static(path.resolve(process.cwd(), 'www', 'assets')));
  app.use('/css', express.static(path.resolve(process.cwd(), 'www', 'css')));
  app.use('/js', express.static(path.resolve(process.cwd(), 'www', 'js')));

  return app;
}

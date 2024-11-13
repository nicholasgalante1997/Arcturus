import express from 'express';
import bodyParser from 'body-parser';
import requestLogger from './request-logger.js';

export default function setupMiddleware(app) {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(requestLogger);
}

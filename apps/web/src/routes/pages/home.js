import express from 'express';
import homePageHandler from '../../handlers/pages/home.js';

const router = express.Router();

router
  .route('/')
  .get(homePageHandler);

router
  .route('/index')
  .get(homePageHandler)

router
  .route('/index.html')
  .get(homePageHandler);

export default router;
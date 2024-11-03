import express from 'express';

import articlePageHandler from '../../handlers/pages/post.js';

const router = express.Router();

/**
 * TODO implement a directory page
 */
// router.route('/').get(homePageHandler);
router.route('/:id').get(articlePageHandler);

export default router;

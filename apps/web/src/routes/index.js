import homePageRouter from './pages/home.js';

/**
 * @param {import('express').Express} app 
 */
export function setupWebRoutes(app) {
    app.use('/', homePageRouter);
}
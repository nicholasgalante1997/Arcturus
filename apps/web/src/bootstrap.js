import './env.js';

import {
  App,
  JobManager,
  Posts,
  WebDependencyManager,
  info,
  debug,
  error,
  closeAppSafely,
  queueRefreshPostsJob,
  run
} from './index.js';

/**
 * Loads all the toml import map configurations from the /public/.import directory
 * This allows them to be injected into the HTML via <script> tags when the page
 * is constructed via ejs in a response handler
 */
info('Loading import map configurations :link: :link: :link:');
await WebDependencyManager.setupImportMap();
info('Import map configurations loaded! :sparkle: :sparkle: :sparkle:');

/**
 * Loads all the posts from the posts api
 * This will be used to populate the home page + article pages
 */
info('Loading posts :page: :page: :page:');
await Posts.loadAllPosts();
info('Posts loaded! :sparkle: :sparkle: :sparkle:');

/**
 * Schedules a job to refresh all posts daily at midnight
 */
info('Scheduling posts refresh job :clock: :clock: :clock:');
queueRefreshPostsJob();
info('Posts refresh job scheduled! :sparkle: :sparkle: :sparkle:');

/**
 * Initializes a Job Queue Manager that processes non-critical application work every 450ms
 */
info('Starting Job Queue Manager :robot: :robot: :robot:');
const jobQueueInterval = setInterval(() => JobManager.processInstanceJobQueue(), 450);
info('Job Queue Manager started! :sparkle: :sparkle: :sparkle:');

/**
 * Starts the server
 */
debug('Starting server with default port %d :rocket: :rocket: :rocket:', 4040);
run(App);

/**
 * Server event listeners
 */
App.on('listening', () =>
  info(':rocket: :+1: :cowboy: @ ' + App.address().address + ':' + App.address().port)
);
App.on('error', (err) => error(err));

/**
 * Process event listeners
 */
process.on('uncaughtException', () => {
  clearInterval(jobQueueInterval);
  closeAppSafely('uncaughtException');
});
process.on('unhandledRejection', () => {
  clearInterval(jobQueueInterval);
  closeAppSafely('unhandledRejection');
});

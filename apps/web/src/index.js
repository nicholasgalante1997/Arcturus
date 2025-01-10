import AppErrorCodes from './lib/errors/index.js';
import JobManager from './lib/jobs/index.js';
import WebDependencyManager from './lib/dependencies/index.js';

import { Posts } from './api/index.js';
import { error, warn, info, debug } from './lib/log/index.js';
import { run, default as App } from './server/index.js';

/**
 * Schedules a job to refresh all posts daily at midnight.
 *
 * The job key is 'refresh-posts'.
 *
 * @function queueRefreshPostsJob
 * @memberof module:web/index
 */
function queueRefreshPostsJob() {
  JobManager.queueRecurringJob(
    async () => await Posts.loadAllPosts(),
    '0 0 * * *',
    'refresh-posts'
  );
}

/**
 * Safely closes the server.
 *
 * @function closeAppSafely
 * @memberof module:web/index
 * @param {string} type - The type of event that triggered closing the server
 */
function closeAppSafely(type) {
  try {
    warn(':warning: Closing server! Receieved %s event', type);
    info('Attempting to close the server gracefully, please wait...');
    App.close();
  } catch (e) {
    error(e instanceof Error ? e?.name + ': ' + e?.message : e);
    process.exit(
      type === 'unhandledRejection'
        ? AppErrorCodes.UNCAUGHT_REJECTION
        : AppErrorCodes.UNCAUGHT_EXCEPTION
    );
  }
}

export {
  App,
  AppErrorCodes,
  JobManager,
  Posts,
  WebDependencyManager,
  error,
  info,
  warn,
  debug,
  closeAppSafely,
  run,
  queueRefreshPostsJob
};

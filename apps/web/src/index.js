import { Posts } from './api/index.js';
import AppErrorCodes from './lib/errors/index.js';
import { error } from './lib/log/index.js';
import JobManager from './lib/jobs/index.js';
import WebDependencyManager from './lib/dependencies/index.js';

import { run, default as App } from './server/index.js';

async function runLoadAllPosts() {
  try {
    await Posts.loadAllPosts();
  } catch (e) {
    error(
      new Error('PAWebServer:::FatalException - runLoadPosts() has thrown the following error')
    );
    error(e);
    throw e;
  }
}

function queueRefreshPostsJob() {
  JobManager.queueRecurringJob(runLoadAllPosts, '0 0 * * *', 'refresh-posts');
}

async function runPreInitServerTasks() {
  await WebDependencyManager.setupImportMap();
  await runLoadAllPosts();
  queueRefreshPostsJob();
  const interval = setInterval(() => JobManager.processInstanceJobQueue(), 450);
  process.on('uncaughtException', () => closeAppSafely(interval, 'uncaughtException'));
  process.on('unhandledRejection', () => closeAppSafely(interval, 'unhandledRejection'));
}

function closeAppSafely(interval, type) {
  try {
    clearInterval(interval);
    App.close();
  } catch (e) {
    error(e instanceof Error ? e?.name + ": " + e?.message : e);
    process.exit(type === 'unhandledRejection' ? AppErrorCodes.UNCAUGHT_REJECTION : AppErrorCodes.UNCAUGHT_EXCEPTION)
  }
}

export { runPreInitServerTasks, run, App };

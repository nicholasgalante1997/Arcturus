import { error } from './lib/log/index.js';
import { postsLibClient } from './api/index.js';
import JobManager from './lib/jobs/index.js';

export { run, default as App } from './server/index.js';

async function runLoadAllPosts() {
  try {
    await postsLibClient.loadAllPosts();
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

export async function runPreInitServerTasks() {
  await runLoadAllPosts();
  queueRefreshPostsJob();

  JobManager.queueInstanceJob(() => console.log('Job 1'));
  JobManager.queueInstanceJob(() => console.log('Job 2'));

  JobManager.processInstanceJobQueue();
}

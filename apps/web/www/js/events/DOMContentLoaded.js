import JobRunner from '../models/Jobs/JobRunner.js';
import { setupWindowLogLevel, info, error } from '../log/index.js';

const homeRoutes = ['/', '/index.html'];

document.addEventListener('DOMContentLoaded', async () => {
  setupWindowLogLevel('*');

  const path = window.location.pathname;

  if (homeRoutes.includes(path)) {
    import('../models/Jobs/runHomePageAnimation.js')
      .then(({ runHomePageAnimation, runHomePageAnimationJobKey }) => {
        JobRunner.queueJob(runHomePageAnimation, 'high', runHomePageAnimationJobKey);
      })
      .catch((e) => error(e));

    import('../models/Jobs/runLoadPosts.js')
      .then(({ runLoadPostsIntoStateJob }) => {
        // JobRunner.queueJob(runLoadPostsIntoStateJob, "med", runLoadPostsKey);
        runLoadPostsIntoStateJob()
          .then(() => info('Loaded posts'))
          .catch((e) => error(e))
      })
      .catch((e) => error(e));

    import('../models/Jobs/runRenderHomePagePostCards.js')
      .then(({ runRenderHomePagePostCards, runRenderHomePagePostCardsJobKey }) => {
        JobRunner.queueJob(runRenderHomePagePostCards, 'med', runRenderHomePagePostCardsJobKey);
      })
      .catch((e) => error(e));

    return;
  }

});

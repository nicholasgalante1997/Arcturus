import JobRunner from '../models/Jobs/JobRunner.js';
import { setupWindowLogLevel, info, error } from '../log/index.js';

const homeRoutes = ['/', '/index.html'];

document.addEventListener('DOMContentLoaded', () => {
  setupWindowLogLevel('*');

  const path = window.location.pathname;

  if (homeRoutes.includes(path)) {
    import('../models/Jobs/runHomePageAnimation.js')
      .then(({ runHomePageAnimation, runHomePageAnimationJobKey }) => {
        JobRunner.run(runHomePageAnimation, 'high', runHomePageAnimationJobKey);
      })
      .catch((e) => error(e));

    import('../models/Jobs/runRenderHomePagePostCards.js')
      .then(({ runRenderHomePagePostCards, runRenderHomePagePostCardsJobKey }) => {
        JobRunner.run(runRenderHomePagePostCards, 'med', runRenderHomePagePostCardsJobKey);
      })
      .catch((e) => error(e));

    return;
  }
  
});

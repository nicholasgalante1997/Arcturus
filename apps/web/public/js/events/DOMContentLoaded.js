import JobRunner from '../models/Jobs/JobRunner.js';
import Store from '../store/index.js';
import { setupWindowLogLevel, error } from '../log/index.js';

const { dispatch, subscribe, useStore } = Store;

const homeRoutes = ['/', '/index', '/index.html'];

document.addEventListener('DOMContentLoaded', async () => {
  setupWindowLogLevel('*');

  const path = window.location.pathname;

  subscribe((state) => {
    console.log('Store Update');
    console.log('State: %o', state);
  })

  const $arcState = window?.$arc || {};

  if ($arcState) {
    dispatch({ type: 'set', data: $arcState });
  }

  if (homeRoutes.includes(path)) {
    import('../models/Jobs/runHomePageAnimation.js')
      .then(({ runHomePageAnimation, runHomePageAnimationJobKey }) => {
        JobRunner.queueJob(runHomePageAnimation, 'high', runHomePageAnimationJobKey);
      })
      .catch((e) => error(e));

    import('../models/Jobs/runAttachCardEventListeners.js')
      .then(({ runAttachPostCardEventListeners, runAttachPostCardEventListenersKey }) => {
        JobRunner.queueJob(
          runAttachPostCardEventListeners,
          'high',
          runAttachPostCardEventListenersKey
        );
      })
      .catch((e) => error(e));

    import('../models/Jobs/runAttachCategoryChipEventListeners.js')
      .then(({ runAttachCategoryChipEventListeners, runAttachCategoryChipEventListenersKey }) => {
        JobRunner.queueJob(
          runAttachCategoryChipEventListeners,
          'high',
          runAttachCategoryChipEventListenersKey
        );
      })
      .catch((e) => error(e));

    return;
  }
});

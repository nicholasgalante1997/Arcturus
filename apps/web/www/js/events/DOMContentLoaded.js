import { setupWindowLogLevel, info, error } from '../log/index.js';

document.addEventListener('DOMContentLoaded', () => {
  setupWindowLogLevel('*');

  const path = window.location.pathname;
  switch (path) {
    case '/': {
    }
    case '/index.html': {
      import('../models/Jobs/JobRunner.js')
        .then(({ default: jobRunner }) => {
          jobRunner.run('lottie.home-page.run-animation');
          jobRunner.run('render.home-page.post-cards');
        })
        .catch((e) => error(e));
      break;
    }

    default: {
    }
  }
});

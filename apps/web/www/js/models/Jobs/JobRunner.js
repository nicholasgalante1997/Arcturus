import mitt from 'mitt';
import { info } from '../../log/index.js';

import { runHomePageAnimation, runHomePageAnimationJobKey } from './runHomePageAnimation.js';
import { runRenderHomePagePostCards, runRenderHomePagePostCardsJobKey } from './runRenderHomePagePostCards.js';

/**
 * Schedules common application tasks
 */
class JobRunner {
  #registeredJobs = new Set();
  #mitt = mitt();
  constructor() {
    this.#setupJobs();
  }

  /**
   * @param {typeof runHomePageAnimationJobKey | typeof runRenderHomePagePostCardsJobKey} job 
   * @param {'low' | 'med' | 'high'} priority 
   */
  run(job, priority = 'med') {
    if (this.#registeredJobs.has(job)) {
      switch (priority) {
        case 'low': {
          info('Queueing Job: ' + job + ' with low priority.', 'pretty');
          setTimeout(() => this.#mitt.emit(job), 0);
          break;
        }
        case 'med': {
          info('Queueing Job: ' + job + ' with medium priority.', 'pretty');
          Promise.resolve().then(() => {
            this.#mitt.emit(job);
          });
          break;
        }
        case 'high': {
          info('Queueing Job: ' + job + ' with high priority', 'pretty');
          queueMicrotask(() => {
            this.#mitt.emit(job);
          });
          break;
        }
      }
    }
  }

  #setupJobs() { 
    this.#mitt.on(runHomePageAnimationJobKey, runHomePageAnimation);   
    this.#registeredJobs.add(runHomePageAnimationJobKey);

    this.#mitt.on(runRenderHomePagePostCardsJobKey, runRenderHomePagePostCards);
    this.#registeredJobs.add(runRenderHomePagePostCardsJobKey);
  }
}

export default new JobRunner();

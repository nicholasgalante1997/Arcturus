import { info } from '../../log/index.js';

/**
 * Schedules common application tasks
 */
class JobRunner {
  /**
   * @param {() => void} job 
   * @param {'low' | 'med' | 'high' | 'immediate'} priority 
   */
  queueJob(job, priority = 'med', name = job?.name || 'Anonymous Job') {
    if (typeof job === 'function') {
      switch (priority) {
        case 'low': {
          info('Queueing Job: ' + name + ' with low priority.', 'pretty');
          setTimeout(job, 0);
          break;
        }
        case 'med': {
          info('Queueing Job: ' + name + ' with medium priority.', 'pretty');
          Promise.resolve().then(job);
          break;
        }
        case 'high': {
          info('Queueing Job: ' + name + ' with high priority', 'pretty');
          queueMicrotask(job);
          break;
        }
        case 'immediate': {
          info('Queueing Job: ' + name + ' with immediate (URGENT) priority', 'pretty');
          job();
          break;
        }
      }
    }
  }
}

export default new JobRunner();

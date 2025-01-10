import debug from 'debug';
import nodeScheduler from 'node-schedule';

import { isPromise } from '../promises/index.js';
import Queue from '../models/Queue.js';

/**
 * @typedef {() => (void | Promise<void>)} VoidFunction
 * @typedef {VoidFunction} Job
 *
 * @typedef {Object} InstanceJobSnapshot
 * @property {string} key
 * @property {Job} job
 * @property {"low" | "medium" | "high"} priority
 *
 */

/**
 * ### Job Manager
 *
 * > A utility class for scheduling one-off or recurring jobs
 */
class JobManager {
  /**
   * @private
   */
  static #instanceJobPostfix = '---instance-job';

  /**
   * @private
   */
  static #recurringJobPostfix = '---recurring-job';

  /**
   * @private
   */
  static #logger = debug('project-arcturus:web:job-manager');

  /**
   * @private
   * @type {Queue<InstanceJobSnapshot>}
   */
  #instanceJobQueue = new Queue({ iterator: { consumptive: true } });
  #instanceJobQueueSucceededJobs = [];
  #instanceJobQueueFailedJobs = [];

  /**
   * @private
   * @type {InstanceJobSnapshot | null}
   */
  #currentJob = null;

  /**
   * @type {Map<string, nodeScheduler.Job>}
   * */
  #recurringJobsRegistry = new Map();

  /**
   *
   * @param {Job} job
   * @param {InstanceJobSnapshot['priority']} priority
   * @param {string} jobKey
   */
  queueInstanceJob(job, priority, jobKey) {
    this.#instanceJobQueue.enqueue({
      job,
      key: jobKey + JobManager.#instanceJobPostfix,
      priority
    });
  }

  processInstanceJobQueue() {
    this.#sortQueueOnPriority();
    for (const jobConf of this.#instanceJobQueue) {
      if (jobConf) {
        this.#currentJob = jobConf;
        const { job, key } = jobConf;
        JobManager.#logger(':hammer: Working on job %s', key);
        try {
          let $jobOpResult = job();
          if (isPromise($jobOpResult)) {
            JobManager.#logger('[WARNING]: An asynchronous job has just been invoked.');
            $jobOpResult
              .then(() => this.#instanceJobQueueSucceededJobs.push(jobConf))
              .catch((e) => {
                JobManager.#logger(
                  '%s threw the following error',
                  JobManager.name + ':' + this.processInstanceJobQueue.name
                );
                JobManager.#logger('Error: %O', e);
                this.#instanceJobQueueFailedJobs.push(jobConf);
              });
          } else {
            this.#instanceJobQueueSucceededJobs.push(jobConf);
          }
        } catch (e) {
          JobManager.#logger(
            '%s threw the following error',
            JobManager.name + ':' + this.processInstanceJobQueue.name
          );
          JobManager.#logger('Error: %O', e);
          this.#instanceJobQueueFailedJobs.push(jobConf);
        }
      }
    }
  }

  /**
   *
   * #### JobManager.queueRecurringJob
   *
   * queues a job for execution on the provided schedule
   *
   * @param {Job} job
   * @param {string} schedule
   * @param {string} jobKey
   */
  queueRecurringJob(job, schedule, jobKey) {
    const expandedKey = jobKey + JobManager.#recurringJobPostfix;

    if (this.#validateRecurringJobScheduleSpec(schedule)) {
      if (this.#recurringJobsRegistry.has(expandedKey)) {
        const job = this.#recurringJobsRegistry.get(expandedKey);
        try {
          job.cancel();
          this.#recurringJobsRegistry.delete(expandedKey);
        } catch (e) {
          JobManager.#logger(
            new Error('JobManager:::queueRecurringJob - Failed to queue recurring job!')
          );
          JobManager.#logger(e);
          throw e;
        }
      }
      const scheduledJob = nodeScheduler.scheduleJob(schedule, job);
      this.#recurringJobsRegistry.set(expandedKey, scheduledJob);
    }
  }

  /**
   * @private
   * @summary
   * Validates a cron job spec syntax
   *
   * @param {string} schedule
   */
  #validateRecurringJobScheduleSpec(schedule) {
    const validSpec =
      /^(\*|([0-5]?\d)(-([0-5]?\d))?(\/([0-5]?\d))?)( (\*|([0-2]?\d)(-([0-2]?\d))?(\/([0-2]?\d))?)){4}$/;
    return validSpec.test(schedule);
  }

  /**
   * @private
   * @summary
   * Sorts the internal queue based on associated job priority;
   */
  #sortQueueOnPriority() {
    const priorityValueMap = {
      low: 3,
      medium: 2,
      high: 1
    };
    this.#instanceJobQueue.sort((a, b) => {
      return priorityValueMap[a.priority] - priorityValueMap[b.priority];
    });
  }

  /**
   * @private
   * @summary
   * Moved failed jobs back to the queue for processing
   */
}

export default new JobManager();

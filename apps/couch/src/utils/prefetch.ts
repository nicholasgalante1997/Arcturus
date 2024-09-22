import { isServer } from './iso';
import { logger } from './logger';

export const prefetchDataAttr = 'data-prefetch' as const;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PrefetchOnEntryFnFactory {
  public static build(
    worker: string,
    workers: Map<string, Worker>,
    addWorker: (w: string) => Worker | null,
    requestWorker: (w: string) => Worker | undefined,
    dispatchWorkerMsg: (w: string, m: string) => boolean
  ): IntersectionObserverCallback | null {
    if (isServer()) {
      return null;
    }

    let workerInstance: Worker | null | undefined = null;

    if (!workers.has(worker)) {
      workerInstance = addWorker(worker);
    } else {
      workerInstance = requestWorker(worker);
    }

    if (!workerInstance) {
      return null;
    } else {
      return function prefetchResourceOnEnter(
        entries: IntersectionObserverEntryInit[],
        _observer: IntersectionObserver
      ): void {
        const element = entries.length ? entries[0] : null;
        if (element) {
          const { isIntersecting } = element;
          const hasDataPrefetchHref = element.target.getAttribute(prefetchDataAttr);
          if (isIntersecting && hasDataPrefetchHref) {
            const didDispatchWorkerMessage = dispatchWorkerMsg(worker, hasDataPrefetchHref);
            if (didDispatchWorkerMessage) {
              logger.info('Dispatched worker message.');
            } else {
              logger.warn('Failed to dispatch worker message.');
            }
          }
        }
      };
    }
  }
}

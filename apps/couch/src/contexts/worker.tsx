import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import { combine } from '@/hocs';

interface WorkerContextType {
  workers: Map<string, Worker>;
  addWorker: (f: string) => Worker | null;
}

const initialWorkerMap = new Map<string, Worker>();
const addWorker = (f: string): Worker | null => null;

const WorkerContext = createContext<WorkerContextType>({
  workers: initialWorkerMap,
  addWorker
});

type ExtendedWorkerContext = WorkerContextType & {
  dispatchWorkerMsg: (w: string, m: unknown) => boolean;
  requestWorker: (w: string) => Worker | undefined;
};

export const useWorkerContext = (): ExtendedWorkerContext => {
  const { addWorker, workers } = useContext(WorkerContext);
  function requestWorker(f: string): Worker | undefined {
    return workers.get(f);
  }
  function dispatchWorkerMsg(w: string, m: unknown): boolean {
    const worker = requestWorker(w);
    if (!worker) {
      return false;
    } else {
      worker.postMessage(m);
      return true;
    }
  }
  return { addWorker, dispatchWorkerMsg, workers, requestWorker };
};

interface WorkerContextProviderComponentProps {
  children: React.ReactNode | React.ReactNode[] | React.JSX.Element | React.JSX.Element[];
}

function WorkerContextProviderComponent({
  children
}: WorkerContextProviderComponentProps): React.ReactNode | React.JSX.Element {
  const [workers, setWorkers] = useState<Map<string, Worker>>(new Map());
  useEffect(() => {
    if (window.Worker) {
      const prefetchWorkerKey = 'prefetch.js';
      const prefetchWorker = new Worker(prefetchWorkerKey);
      setWorkers((pastMap) => pastMap.set(prefetchWorkerKey, prefetchWorker));
    }
  }, []);
  const addWorker = (f: string): Worker | null => {
    if (window.Worker) {
      const existingWorker = workers.has(f);
      if (existingWorker) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return workers.get(f)!;
      } else {
        const localWorker = new Worker(f);
        setWorkers((pastMap) => pastMap.set(f, localWorker));
        return localWorker;
      }
    } else {
      return null;
    }
  };
  return <WorkerContext.Provider value={{ workers, addWorker }}>{children}</WorkerContext.Provider>;
}

export const WorkerContextProvider = combine<WorkerContextProviderComponentProps>(
  [],
  memo(WorkerContextProviderComponent),
  'worker-ctx-provider-component'
);
WorkerContextProvider.displayName = 'CouchContext__WorkerContextProviderComponent';

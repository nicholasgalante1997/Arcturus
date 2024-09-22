import { logger } from '@/utils';
import { useEffect } from 'react';

export const useOnMount = function (
  callback: (() => void) | (() => Promise<void>),
  cleanup?: () => void
): void {
  useEffect(() => {
    void Promise.resolve(callback()).catch((e) => {
      logger.error(e);
    });
    if (typeof cleanup !== 'undefined') {
      return cleanup;
    }
  }, []);
};

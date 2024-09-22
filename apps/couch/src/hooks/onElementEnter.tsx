import { useEffect, useState } from 'react';
import { logger } from '@/utils';

const getAddedLogline: (id: string) => string = (id: string) =>
  `Added element #${id} to IntersectionObserver entity.` as const;

export const useOnElementEnter = function (
  id: string,
  callback: IntersectionObserverCallback | null,
  options: IntersectionObserverInit & { disabled: boolean } = { disabled: false }
): void {
  const { disabled, ...rest } = options;
  const [observer, setObserver] = useState<IntersectionObserver | null>();
  useEffect(() => {
    if (!disabled && callback) {
      setObserver(new IntersectionObserver(callback, rest));
      return () => {
        setObserver(null);
      };
    }
  }, [disabled, callback]);
  useEffect(() => {
    if (!disabled) {
      const elementById = document.getElementById(id);
      if (observer && elementById) {
        observer.observe(elementById);
        logger.info(getAddedLogline(id));
        return () => {
          observer.disconnect();
        };
      }
    }
  }, [disabled, observer, id]);
};

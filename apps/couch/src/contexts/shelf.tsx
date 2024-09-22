import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { combine } from '@/hocs';
import isEqual from 'lodash.isequal';

export const LOCAL_STORAGE_SHELF_KEY = 'couch_gag_v0_shelf_storage' as const;

export interface ShelfContextType {
  uuid?: string;
  shelfKey?: string;
  update: (shelfObj: Pick<ShelfContextType, 'shelfKey' | 'uuid'>) => void;
}

function update(shelfObj: Pick<ShelfContextType, 'uuid' | 'shelfKey'>): void {}

const ShelfContext = createContext<ShelfContextType>({ update });

export const useShelfContext = (): ShelfContextType => useContext(ShelfContext);

interface ShelfContextProviderProps {
  children: React.ReactNode | React.ReactNode[] | React.JSX.Element | React.JSX.Element[];
}

export type ShelfContextState = Partial<Pick<ShelfContextType, 'uuid' | 'shelfKey'>>;

function ShelfContextProviderComponent({ children }: ShelfContextProviderProps): React.JSX.Element {
  const [shelfState, setShelfState] = useState<ShelfContextState>();
  const update = useCallback(
    ({ uuid = shelfState?.uuid, shelfKey = shelfState?.shelfKey }: ShelfContextState) => {
      setShelfState({ uuid, shelfKey });
    },
    [shelfState]
  );
  const contextValues: ShelfContextType = useMemo(
    () => ({
      update,
      ...shelfState
    }),
    [shelfState, update]
  );
  useEffect(() => {
    const shelfFromLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_SHELF_KEY);
    if (shelfFromLocalStorage != null) {
      const shelf: ShelfContextState = JSON.parse(shelfFromLocalStorage);
      if (!isEqual(shelf, shelfState)) {
        setShelfState(shelf);
      }
    }
  }, []);
  return <ShelfContext.Provider value={contextValues}>{children}</ShelfContext.Provider>;
}

export const ShelfContextProvider = combine<ShelfContextProviderProps>(
  [],
  memo(ShelfContextProviderComponent),
  'shelf-context-provider'
);
ShelfContextProvider.displayName = 'CouchContext__ShelfContextProviderComponent';

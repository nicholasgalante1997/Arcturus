import React, { createContext, memo, useContext, useState } from 'react';
import { combine } from '@/hocs';
import writMd from './data/writ.json';

interface WritContextType {
  getAll: () => (typeof writMd)['metadata'];
  getOne: (key: string, value: unknown) => (typeof writMd)['metadata'][number] | undefined;
}

const defaultWritContext = {
  getAll() {
    return writMd.metadata;
  },
  getOne(key: string, value: unknown) {
    return writMd.metadata.find((mdObj) => mdObj[key as keyof typeof mdObj] === value);
  }
};

const WritContext = createContext<WritContextType>(defaultWritContext);

export const useWritContext = (): WritContextType => useContext(WritContext);

const WritProviderComponent = function ({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [writState] = useState(writMd);
  const getAll: () => typeof writState.metadata = () => writState.metadata;
  const getOne: (key: string, value: unknown) => (typeof writState.metadata)[number] | undefined = (
    key: string,
    value: unknown
  ) => writState.metadata.find((mdObj) => mdObj[key as keyof typeof mdObj] === value);
  return <WritContext.Provider value={{ getAll, getOne }}>{children}</WritContext.Provider>;
};

export const WritProvider = combine<{ children: React.ReactNode }>(
  [],
  memo(WritProviderComponent),
  'writ-provider'
);
WritProvider.displayName = 'CouchContext__WritProviderComponent';

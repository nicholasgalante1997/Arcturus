import { createContext, useContext } from 'react';

interface IOverlayContext {
  open(): void;
  close(): void;
}

const defaultContext = {
  open() {},
  close() {}
};

export const OverlayContext = createContext<IOverlayContext>(defaultContext);
export const useOverlayContext = () => useContext(OverlayContext);

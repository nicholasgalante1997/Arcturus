import { createContext, useContext } from 'react';

interface IOverlayContext {
  open(): void;
  close(): void;
  isOpen: boolean;
}

const defaultContext = {
  open() {},
  close() {},
  isOpen: false
};

export const OverlayContext = createContext<IOverlayContext>(defaultContext);
export const useOverlayContext = () => useContext(OverlayContext);

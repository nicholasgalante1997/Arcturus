import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import { combine } from '@/hocs';

interface ExceptionContextProviderProps {
  children: React.ReactNode | React.ReactNode[] | React.JSX.Element | React.JSX.Element[];
}

export interface ExceptionToastProps {
  error: string;
  cause: string;
  id: string;
}

export interface ExceptionContextType {
  dispatchException: (props: ExceptionToastProps) => void;
}

const defaultDispatchException = (_props: ExceptionToastProps): void => {};

const ExceptionContext = createContext<ExceptionContextType>({ dispatchException: defaultDispatchException });

export const useExceptionContext = (): ExceptionContextType => useContext(ExceptionContext);

function ExceptionContextProviderComponent({
  children
}: ExceptionContextProviderProps): React.JSX.Element | React.JSX.Element[] {
  const [toasts, setToasts] = useState<ExceptionToastProps[]>([]);
  function autoclose(toastId: string): void {
    const toastToBeClosed = toasts.find((toast) => toast.id === toastId);
    if (toastToBeClosed) {
      setToasts((current) => current.filter((toast) => toast.id !== toastToBeClosed.id));
    }
  }

  useEffect(() => {
    if (toasts.length > 0) {
      setTimeout(() => autoclose(toasts[toasts.length - 1].id), 7000);
    }
  }, [toasts]);

  function dispatchException(toast: ExceptionToastProps): void {
    const { id } = toast;
    const bannerExists = toasts.find((bannerIterConfig) => bannerIterConfig.id === id);
    if (bannerExists) return;
    setToasts((current) => [...current, toast]);
  }

  return <ExceptionContext.Provider value={{ dispatchException }}>{children}</ExceptionContext.Provider>;
}

export const ExceptionContextProvider = combine<ExceptionContextProviderProps>(
  [],
  memo(ExceptionContextProviderComponent),
  'exception-provider-component'
);
ExceptionContextProvider.displayName = 'CouchContext__ExceptionsProviderComponent';

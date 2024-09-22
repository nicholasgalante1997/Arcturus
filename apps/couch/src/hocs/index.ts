import { type ErrorBoundaryProps } from './error';
import type React from 'react';

export type HOCWrapperFn<P = {} & React.JSX.IntrinsicAttributes> = (
  id: string,
  component: React.FC<P>
) => ((props: P) => React.ReactElement | React.ReactNode | React.JSX.Element) | React.FC<P>;

export function combine<P = ErrorBoundaryProps & {} & JSX.IntrinsicAttributes>(
  wrappers: Array<HOCWrapperFn<P>>,
  Component: React.FC<P>,
  id: string
): React.FC<P> {
  let WrappedComponent = Component;
  for (const wrapper of wrappers) {
    WrappedComponent = wrapper(id, WrappedComponent);
  }
  return WrappedComponent;
}

export * from './root';
export * from './error';
export * from './route';

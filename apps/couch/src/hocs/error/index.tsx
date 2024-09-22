import { ErrorWrapper } from '@/components/ErrorBoundary';
import React from 'react';

export interface ErrorBoundaryProps {
  fallback?: React.JSX.Element;
}

export function withErrorWrapper<P = {} & JSX.IntrinsicAttributes & ErrorBoundaryProps>(
  id: string,
  Component: React.FC<P>
): React.FC<P> {
  // eslint-disable-next-line react/display-name
  return function (props: P) {
    const { fallback, ...rest } = props as P & JSX.IntrinsicAttributes & ErrorBoundaryProps;
    if (!fallback) {
      return <Component {...(rest as P & JSX.IntrinsicAttributes)} />;
    }
    return (
      <ErrorWrapper id={id} fallback={fallback}>
        <Component {...(rest as P & JSX.IntrinsicAttributes)} />
      </ErrorWrapper>
    );
  };
}

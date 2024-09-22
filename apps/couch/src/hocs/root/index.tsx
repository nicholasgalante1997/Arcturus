import React from 'react';
import { Root } from '@/components';

export function withRootProviders<P = {} & JSX.IntrinsicAttributes>(
  id: string,
  Component: React.FC<P>
): React.FC<P> {
  // eslint-disable-next-line react/display-name
  return function (props: P) {
    return (
      <Root id={id}>
        <Component {...(props as P & JSX.IntrinsicAttributes)} />
      </Root>
    );
  };
}

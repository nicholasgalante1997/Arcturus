import React from 'react';
import { GridRootProps, GridClassNames } from './Grid.types';
import classNames from 'classnames';

function GridRoot({ children, className, ...rest }: GridRootProps) {
  return (
    <div {...rest} className={classNames(className, GridClassNames.ROOT)}>
      {children}
    </div>
  );
}

export default GridRoot;

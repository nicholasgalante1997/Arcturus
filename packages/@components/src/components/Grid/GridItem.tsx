import React from 'react';
import { GridItemProps, GridClassNames } from './Grid.types';
import classNames from 'classnames';
import { resolvePtr } from 'dns';

function GridItem({
  children,
  className,
  colEnd,
  colStart,
  rowEnd,
  rowStart,
  style = {},
  ...rest
}: GridItemProps) {
  return (
    <div
      {...rest}
      className={classNames(className, GridClassNames.ITEM)}
      style={{ ...style, gridColumn: `${colStart} / ${colEnd}`, gridRow: `${rowStart} / ${rowEnd}` }}
    >
      {children}
    </div>
  );
}

export default GridItem;

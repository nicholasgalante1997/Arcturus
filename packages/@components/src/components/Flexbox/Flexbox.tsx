import React, { memo } from 'react';
import classNames from 'classnames';

import { pickArrangement, pickDirClassName, pickGap, pickSpacingClassNames } from './Flexbox.utils';
import { FlexboxProps, FlexboxCN } from './Flexbox.types';

function Flexbox({
  dir = 'row',
  spacing = '',
  arrange,
  flex,
  gap,
  wrap,
  className,
  children,
  style = {},
  ...rest
}: FlexboxProps) {
  return (
    <div
      {...rest}
      style={{ ...style, flex }}
      className={classNames(
        className,
        FlexboxCN.BASE,
        pickDirClassName(dir),
        pickArrangement(arrange),
        pickGap(gap),
        pickSpacingClassNames(spacing),
        wrap && FlexboxCN.WRAP
      )}
    >
      {children}
    </div>
  );
}

export default memo(Flexbox as React.FC<FlexboxProps>);

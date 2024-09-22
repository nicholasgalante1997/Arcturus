import React from 'react';
import classNames from 'classnames';

import LinkProps from './Link.types';

const linkClassName = 'h-link';

function LinkComponent({ children, className, ...rest }: LinkProps) {
  return (
    <a {...rest} className={classNames({ [linkClassName]: true, className })}>
      {children}
    </a>
  );
}

export const Link = React.memo(LinkComponent as React.FC<LinkProps>);
Link.displayName = 'HlrLink';

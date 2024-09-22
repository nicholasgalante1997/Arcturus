import React, { memo } from 'react';
import classNames from 'classnames';
import { type AlertProps } from './Alert.types';

import { Body } from '../Body';
import { Heading } from '../Heading';
import { Conditional } from '../_internal/Conditional';

const alertClassNames = {
  root: 'h-alert',
  body: 'h-alert-body-content',
  icon: 'h-alert-dismiss-icon-container'
} as const;

function AlertComponent(props: AlertProps) {
  const { message, severity, dismissable = false, onDismiss, className, id, ...rest } = props;
  return (
    <div {...rest} id={id} className={classNames(alertClassNames.root, className)} role="alert">
      <span id="h-alert-severity-indicator" data-severity={severity} />
      <div data-shrink={dismissable ? 'shrink' : 'none'} className={alertClassNames.body}>
        <Heading as="h6" data-severity={severity}>
          {message.heading}
        </Heading>
        <Body as="p" accent bold>
          {message.body}
        </Body>
      </div>
      <Conditional condition={dismissable}>
        <span className={alertClassNames.icon} role="button" onClick={onDismiss}>
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path
                d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </span>
      </Conditional>
    </div>
  );
}

export const Alert = memo(AlertComponent as React.FC<AlertProps>);
Alert.displayName = 'HlrAlert';

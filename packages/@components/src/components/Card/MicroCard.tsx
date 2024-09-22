import React, { memo } from 'react';
import classNames from 'classnames';

import { Link } from '../Link';

import { MicroCardProps } from './types';
import { Heading } from '../Heading';
import { Body } from '../Body';

function MicroCard({
  action,
  description,
  scale,
  subtitle,
  title,
  className = '',
  style = {},
  ...rest
}: MicroCardProps) {
  return (
    <div
      {...rest}
      style={
        {
          ...style,
          '--hlr-card-default-height-scale-factor': scale,
          '--hlr-card-default-width-scale-factor': scale
        } as any
      }
      className={classNames(className, 'hlr-micro-card')}
    >
      <div className="hlr-card-body-container">
        <Heading as="h1">{title}</Heading>
        {subtitle && <Body className="hlr-card-body-subtitle" as="span">{subtitle}</Body>}
        <Body className="hlr-card-body-description" as="p">{description}</Body>
      </div>
      <div className="hlr-card-action-container">
        <Link href={action.href} target={action.target}>{action.label}</Link>
      </div>
    </div>
  );
}

export default memo(MicroCard as React.FC<MicroCardProps>);
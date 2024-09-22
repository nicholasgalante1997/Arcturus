import React, { memo } from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { Link } from '../Link';

import { CardProps } from './types';
import { Heading } from '../Heading';
import { Body } from '../Body';

function Card({
  action,
  description,
  media,
  mediaAlt,
  scale,
  subtitle,
  title,
  className = '',
  style = {},
  ...rest
}: CardProps) {
  const mediaIsJsx = typeof media !== 'string';

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
      className={classNames(className, 'hlr-card')}
    >
      <div className="hlr-card-image-container">
        {mediaIsJsx ? media : <img src={media} alt={mediaAlt} />}
      </div>
      <div className="hlr-card-body-container">
        <Heading as="h1">{title}</Heading>
        {subtitle && <Body className="hlr-card-body-subtitle" as="span">{subtitle}</Body>}
        <Body className="hlr-card-body-description" as="p">{description}</Body>
      </div>
      <div className="hlr-card-action-container">
        {action.type === 'button' && <Button onChange={action.onChange}>{action.label}</Button>}
        {action.type === 'link' && <Link href={action.href} target={action.target}>{action.label}</Link>}
      </div>
    </div>
  );
}

export default memo(Card as React.FC<CardProps>);

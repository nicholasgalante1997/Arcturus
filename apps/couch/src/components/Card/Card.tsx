import React, { useCallback } from 'react';

import { Button } from '@project-arcturus/components';

import { to } from '@/utils';

import { CardClassNames } from './classnames';
import { type CardProps } from './types';

function hasInsufficientProps(props: CardProps): boolean {
  const { image, type } = props;
  if (type === 'full' && typeof image === 'undefined') return true;
  return false;
}

export function CardComponent(props: CardProps): React.JSX.Element | React.ReactNode {
  const hide = hasInsufficientProps(props);

  if (hide) {
    return false;
  }

  const { type, title, image, alt, description, cta, size = 'lg' } = props;

  const renderImage = useCallback<() => React.ReactNode>(() => {
    if (type === 'mini') return false;
    return (
      <div className={CardClassNames.CardImageWrapper} data-couchcardtype={type} data-couchcardsize={size}>
        <img
          src={image}
          alt={alt}
          className={CardClassNames.CardImage}
          data-couchcardtype={type}
          data-couchcardsize={size}
        />
      </div>
    );
  }, [type, image, size]);

  const renderBody = useCallback<() => React.ReactNode>(() => {
    return (
      <div className={CardClassNames.CardBody} data-couchcardtype={type} data-couchcardsize={size}>
        <h1 className={CardClassNames.CardTitle} data-couchcardtype={type} data-couchcardsize={size}>
          {title}
        </h1>
        <p className={CardClassNames.CardText} data-couchcardtype={type} data-couchcardsize={size}>
          {description}
        </p>
      </div>
    );
  }, [size, type]);

  const renderAction = useCallback<() => React.ReactNode>(() => {
    return (
      <React.Fragment>
        {type === 'full' && size === 'lg' ? (
          <Button
            onClick={() => to(cta.href)}
            v="primary"
            hover={{ animationType: 'scale-content' }}
            className="ls"
            size="small"
            style={{ marginTop: 'auto' }}
          >
            {cta.text}
          </Button>
        ) : (
          <a href={cta.href} target="_self" data-couchcardtype={type} data-couchcardsize={size}>
            {cta.text}
          </a>
        )}
      </React.Fragment>
    );
  }, [type, size]);

  return (
    <div className={CardClassNames.CardWrapper} data-couchcardtype={type} data-couchcardsize={size}>
      {renderImage()}
      {renderBody()}
      {renderAction()}
    </div>
  );
}

import React from 'react';
import { type HeadingProps } from './Heading.types';
import classNames from 'classnames';

const headingJsxMap = new Map<HeadingProps['as'], React.FC<Omit<HeadingProps, 'as'>>>([
  ['h1', ({ children, ...rest }) => <h1 {...rest}>{children}</h1>],
  ['h2', ({ children, ...rest }) => <h2 {...rest}>{children}</h2>],
  ['h3', ({ children, ...rest }) => <h3 {...rest}>{children}</h3>],
  ['h4', ({ children, ...rest }) => <h4 {...rest}>{children}</h4>],
  ['h5', ({ children, ...rest }) => <h5 {...rest}>{children}</h5>],
  ['h6', ({ children, ...rest }) => <h6 {...rest}>{children}</h6>]
]);

function convertTagToScale(tag: HeadingProps['as']) {
  return tag.replace('h', '');
}

function HeadingComponent({ as, className: classNameProp = '', children, ...rest }: HeadingProps) {
  const Component = React.useMemo(() => headingJsxMap.get(as), [as]);
  const headingClassName = React.useMemo(() => `h-heading-${convertTagToScale(as)}00`, [as]);
  const className = classNames(headingClassName, classNameProp);

  if (!Component) {
    console.error('HELLER-2-REACT:::TYPOGRAPHY:::UNSUPPLIED_AS_PROP');
    return false;
  }

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export const Heading = React.memo(HeadingComponent as React.FC<HeadingProps>);
Heading.displayName = 'HlrHeading';

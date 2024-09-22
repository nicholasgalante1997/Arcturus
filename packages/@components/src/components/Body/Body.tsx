import React, { useMemo } from 'react';
import { type BodyProps } from './Body.types';
import classNames from 'classnames';

const bodyTextMap = new Map<BodyProps['as'], (props: any) => React.JSX.Element>([
  ['p', ({ children, ...rest }) => <p {...rest}>{children}</p>],
  ['span', ({ children, ...rest }) => <span {...rest}>{children}</span>],
  ['label', ({ children, ...rest }) => <label {...rest}>{children}</label>]
]);

function BodyComponent({
  children,
  as,
  italic,
  bold,
  accent,
  className: classNameProp = '',
  ...rest
}: BodyProps) {
  const Component = useMemo(() => bodyTextMap.get(as), [as]);
  const className = useMemo(
    () =>
      classNames({
        'h-body': true,
        'h-body-bold': bold,
        'h-body-italic': italic,
        'h-body-accent': accent,
        [classNameProp]: !!classNameProp
      }),
    [italic, bold, classNameProp, accent]
  );
  if (!Component) {
    console.error('HELLER-2-REACT:::TYPOGRAPHY:::UNSUPPLIED_AS_PROP');
    return false;
  }
  return (
    <Component {...rest} className={className}>
      {children}
    </Component>
  );
}

export const Body = React.memo(BodyComponent as React.FC<BodyProps>);
Body.displayName = 'HlrBody';

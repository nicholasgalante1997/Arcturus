import React from 'react';
import classNames from 'classnames';

import { type ButtonProps } from './Button.types';
import { buttonVariantClassNameMap, buttonSizeClassMap, getHoverAnimation } from './Button.utils';

function ButtonComponent({
  children,
  hover,
  v = 'primary',
  size = 'medium',
  rounded,
  className: classNameProp = '',
  ...rest
}: ButtonProps) {
  const buttonDefaultClassName = 'h-button';
  const buttonVClassName = React.useMemo(() => buttonVariantClassNameMap.get(v), [v]);
  const buttonSizeClassName = React.useMemo(() => buttonSizeClassMap.get(size), [size]);
  const buttonHoverClassName = React.useMemo(() => hover && getHoverAnimation(hover.animationType), [hover]);
  const className = React.useMemo(
    () =>
      classNames({
        [buttonDefaultClassName]: true,
        [buttonSizeClassName || '']: buttonSizeClassName,
        [buttonVClassName || '']: buttonVClassName,
        [buttonHoverClassName || '']: buttonHoverClassName,
        [classNameProp]: classNameProp,
        rounded
      }),
    [buttonVClassName, buttonSizeClassName, classNameProp, buttonHoverClassName, rounded]
  );
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export const Button = React.memo(ButtonComponent as React.FC<ButtonProps>);
Button.displayName = 'HlrButton';

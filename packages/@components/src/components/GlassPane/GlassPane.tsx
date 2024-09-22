import React, { memo } from 'react';
import classNames from 'classnames';
import { Conditional } from '@/components/_internal/Conditional';
import { type GlassPaneProps } from './GlassPane.types';

const baseGlassPaneRootClassName = 'heller2-glass-pane';
const liteGlassPaneClassName = 'heller2-glass-pane-shade-white';
const darkGlassPaneClassName = 'heller2-glass-pane-shade-black';

function GlassPaneComponent({
  children = false,
  blur = 'normal',
  mode = 'light',
  height,
  width,
  style = {}
}: GlassPaneProps): React.JSX.Element {
  const className = classNames({
    [baseGlassPaneRootClassName]: true,
    [liteGlassPaneClassName]: mode === 'light',
    [darkGlassPaneClassName]: mode === 'dark'
  });
  return (
    <div className={className} data-hlr-blur-weight={blur} style={{ height, width, ...style }}>
      <Conditional condition={Boolean(children)}>{children}</Conditional>
    </div>
  );
}

export const GlassPane = memo(GlassPaneComponent as React.FC<GlassPaneProps>);
GlassPane.displayName = 'HlrGlassPane';

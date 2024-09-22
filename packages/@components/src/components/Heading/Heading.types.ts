import type React from 'react';
interface InternalHeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export type HeadingProps = React.HTMLProps<HTMLHeadingElement> & InternalHeadingProps;

import { CSSProperties } from 'react';

export interface GlassPaneProps {
  blur?: 'lite' | 'normal' | 'heavy';
  mode?: 'dark' | 'light';
  height?: string | number;
  width?: string | number;
  style?: CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}

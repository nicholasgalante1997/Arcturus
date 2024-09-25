import { HTMLProps } from 'react';

export interface Props extends Partial<HTMLProps<HTMLImageElement>> {
  icon: 'hamburger-menu';
}

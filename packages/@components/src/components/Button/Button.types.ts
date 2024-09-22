import type React from 'react';
import { type HasChildNodes } from '@/types/HasChildren';

export type ButtonAnimationOnHover = 'raise-elevation' | 'background-transition' | 'scale-content';
interface InternalButtonProps {
  v?: 'primary' | 'secondary' | 'tertiary' | 'noir';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  hover?: {
    animationType: ButtonAnimationOnHover;
  };
}

export type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'type'> &
  HasChildNodes &
  InternalButtonProps;

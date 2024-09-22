import type React from 'react';

export type ChipProps = {
  text: string;
  shade: 'amethyst' | 'gold' | 'blue' | 'orange';
  className?: string;
  id?: string;
  role?: string;
} & React.JSX.IntrinsicAttributes;

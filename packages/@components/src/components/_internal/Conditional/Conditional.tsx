import React from 'react';
import { type ConditionalProps } from './Conditional.types';

function ConditionalComponent({ children, condition }: ConditionalProps) {
  return condition && children;
}

export const Conditional = React.memo(ConditionalComponent);

import React, { memo } from 'react';
import { InputProps } from './types';

function Input(props: InputProps) {
  return <input {...props} />;
}

export default memo(Input);

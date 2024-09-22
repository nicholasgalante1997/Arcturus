import React, { memo } from 'react';
import Flexbox from './Flexbox';
import { FlexboxProps } from './Flexbox.types';

function Col(props: Omit<FlexboxProps, 'dir'>) {
  return <Flexbox dir="col" {...props} />;
}

export default memo(Col);

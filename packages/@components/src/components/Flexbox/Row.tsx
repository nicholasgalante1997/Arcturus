import React, { memo } from 'react';
import Flexbox from './Flexbox';
import { FlexboxProps } from './Flexbox.types';

function Row(props: Omit<FlexboxProps, 'dir'>) {
  return <Flexbox dir="row" {...props} />;
}

export default memo(Row);

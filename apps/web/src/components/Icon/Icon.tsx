import React, { memo } from 'react';

import { Props as IconProps } from './Icon.types';

function Icon({ icon, ...rest }: IconProps) {
  return <img src={`/assets/icons/${icon}.svg`} {...rest} />;
}

export default memo(Icon);

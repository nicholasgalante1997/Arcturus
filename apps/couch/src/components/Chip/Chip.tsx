import React, { memo } from 'react';
import { combine } from '@/hocs';
import { ChipClassnames } from './classnames';
import { type ChipProps } from './types';
import classnames from 'classnames';

function ChipComponent({ shade, text, className, ...rest }: ChipProps): JSX.Element {
  return (
    <span
      {...rest}
      className={classnames({
        [ChipClassnames.Chip]: true,
        [ChipClassnames.Amethyst]: shade === 'amethyst',
        [ChipClassnames.Gold]: shade === 'gold',
        [ChipClassnames.Orange]: shade === 'orange',
        [ChipClassnames.Blue]: shade === 'blue',
        ...(className ? { [className]: true } : {})
      })}
    >
      {text}
    </span>
  );
}

export const Chip = combine<ChipProps>([], memo(ChipComponent), 'Chip');
Chip.displayName = 'Couch__ChipComponent';

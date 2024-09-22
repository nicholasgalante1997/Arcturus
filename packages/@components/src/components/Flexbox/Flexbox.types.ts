import { HTMLProps } from 'react';
import { HasChildNodes } from '@/types/HasChildren';

export type FlexItemOrientationShorthand = 'start' | 'center' | 'end';

interface BaseFlexboxProps {
  dir?: 'row' | 'col' | 'rowr' | 'colr';
  spacing?: string;
  arrange?: `${FlexItemOrientationShorthand}${'' | ` ${FlexItemOrientationShorthand}`}`;
  flex?: string | number;
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
}

export type FlexboxProps = Omit<HTMLProps<HTMLDivElement>, 'ref'> & BaseFlexboxProps & HasChildNodes;

export enum FlexboxCN {
  BASE = 'hlr-base-flexbox',
  ROW = 'hlr-flexbox-row',
  COL = 'hlr-flexbox-col',
  ROWR = 'hlr-flexbox-row-rev',
  COLR = 'hlr-flexbox-col-rev',

  JC_START = 'hlr-j-start',
  JC_CENTER = 'hlr-j-center',
  JC_END = 'hlr-j-end',
  ALI_START = 'hlr-a-start',
  ALI_CENTER = 'hlr-a-center',
  ALI_END = 'hlr-a-end',

  GAP_SM = 'hlr-gap-sm',
  GAP_MD = 'hlr-gap-md',
  GAP_LG = 'hlr-gap-lg',

  WRAP = 'hlr-flexbox-wrap'
}

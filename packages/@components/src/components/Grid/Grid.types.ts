import { HasChildNodes } from '@/types';
import { HTMLProps } from 'react';

export type GridRootProps = Omit<HTMLProps<HTMLDivElement>, 'children'> & HasChildNodes;

export type Grid = React.FC<GridRootProps> & { Item: React.FC<GridItemProps> };

export type GridItemProps = GridRootProps & {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;

  mRowStart?: number;
  mRowEnd?: number;
  mColStart?: number;
  mColEnd?: number;

  tabRowStart?: number;
  tabRowEnd?: number;
  tabColStart?: number;
  tabColEnd?: number;
};

export enum GridClassNames {
  ROOT = 'hlr-grid-root',
  ITEM = 'hlr-grid-item'
}

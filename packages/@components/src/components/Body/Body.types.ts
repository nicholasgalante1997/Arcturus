import { type HTMLProps } from 'react';
import { type HasChildNodes } from '@/types/HasChildren';

type TextHtmlProps = HTMLProps<HTMLSpanElement | HTMLParagraphElement | HTMLLabelElement>;
interface InternalBodyTextProps {
  bold?: boolean;
  italic?: boolean;
  accent?: boolean;
  as: 'p' | 'label' | 'span';
}

export type BodyProps = TextHtmlProps & InternalBodyTextProps & HasChildNodes;

import { combine } from '@/hocs';
import { CardComponent } from './Card';
import { type CardProps } from './types';
import { memo } from 'react';

const Card = combine<CardProps>([], memo(CardComponent), 'card');
Card.displayName = 'Couch__CardComponent';

export { Card, type CardProps };

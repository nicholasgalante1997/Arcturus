import { combine } from '@/hocs';
import { CardGridComponent } from './CardGrid';
import { memo } from 'react';

const CardGrid = combine<{}>([], memo(CardGridComponent), 'card-grid');
CardGrid.displayName = 'Couch__CardGrid';

export { CardGrid };

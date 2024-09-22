import React from 'react';

import Head from './Head';
import Body from './Body';

import { type DocumentProps } from './types';

function Document({ children, pageCtx, styles, routeKey }: DocumentProps) {
  return (
    <html lang="en">
      <Head pageCtx={pageCtx} styles={styles} />
      <Body routeKey={routeKey} pageCtx={pageCtx}>
        {children}
      </Body>
    </html>
  );
}

export default React.memo(Document);

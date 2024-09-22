import React from 'react';

import { type DocumentProps } from './types';

type HeadProps = Pick<DocumentProps, 'pageCtx' | 'styles'>;

function Head({ pageCtx, styles }: HeadProps) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      {pageCtx.author && <meta name="author" content="" />}
      <meta name="description" content={pageCtx.document.description} />
      <title>{pageCtx.document.title}</title>
      <link rel="stylesheet" href="/variables.css" />
      <link rel="stylesheet" href="/alert.min.css" />
      <link rel="stylesheet" href="/base.min.css" />
      <link rel="stylesheet" href="/button.min.css" />
      <link rel="stylesheet" href="/typography.min.css" />
      <link rel="stylesheet" href="/index.css" />
      {styles}
    </head>
  );
}

export default React.memo(Head);

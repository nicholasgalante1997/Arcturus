import React, { memo } from 'react';
import { ErrorCode } from '@/components';
import { Document } from '@/components/Document';

function ErrorPage(): React.JSX.Element {
  return (
    <Document
      styles={[<link rel="stylesheet" href="" />]}
      routeKey="couch-gag-error-page-route-v0.1"
      pageCtx={{
        document: { title: 'Couch Gag | Page Not Found', description: '' },
        id: 'couch-gag-error-page-component'
      }}
    >
      <ErrorCode code={404} />
    </Document>
  );
}

// export const ErrorPage = combine(
//   [withRouteGuard('couch-gag-error-page-route-v0.1'), withRootProviders],
//   memo(ErrorPageComponent),
//   'couch-gag-error-page-component'
// );

ErrorPage.displayName = 'CouchPage__Error';

export default memo(ErrorPage);

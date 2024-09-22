import React from 'react';
import { Browse } from '@/components/Browse';
import { Document } from '@/components/Document';

function BrowsePage(): React.JSX.Element {
  return (
    <Document
      styles={[<link rel="stylesheet" href="/browse.css" />]}
      pageCtx={{
        id: 'browse-page',
        document: {
          title: 'The Couch Gag, Browse Stories',
          description: 'Search for stories contained within "The Couch Gag" seasons\'s 1 and 2.'
        }
      }}
      routeKey="couch-gag-browse-page-route-v0.1"
    >
      <div className="browse__frame">
        <Browse />
      </div>
    </Document>
  );
}

BrowsePage.displayName = 'CouchPage__Browse';

export default React.memo(BrowsePage);

import React, { memo } from 'react';
import { Hero, SubscribeBanner } from '@/components';
import { Document } from '@/components/Document';

function LandingPage(): React.JSX.Element {
  return (
    <Document
      styles={[<link rel="stylesheet" href="landing-page.css" />]}
      routeKey="couch-gag-landing-page-route-v0.1"
      pageCtx={{ document: { description: '', title: 'Couch Gag' }, id: 'landing-page' }}
    >
      <Hero />
      <SubscribeBanner />
    </Document>
  );
}

LandingPage.displayName = 'CouchPage__Landing';

export default memo(LandingPage);

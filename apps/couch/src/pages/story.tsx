import React, { memo } from 'react';
import { Story, type StoryProps } from '@/components';
import { Document } from '@/components/Document';

function StoryPage(props: StoryProps): React.JSX.Element {
  return (
    <Document
      routeKey="couch-gag-story-page-route-v0.1"
      styles={[<link key="story" rel="stylesheet" href="/story.css" />]}
      pageCtx={{ document: { description: props.description, title: props.title }, id: 'story-page' }}
    >
      <Story {...props} />
    </Document>
  );
}

StoryPage.displayName = 'CouchPage__Story';

export default memo(StoryPage);

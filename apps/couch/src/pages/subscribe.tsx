import React, { memo } from 'react';
import { combine, withRootProviders } from '@/hocs';

function SubscribePageComponent(): React.JSX.Element {
  return <React.Fragment></React.Fragment>;
}

export const SubscribePage = combine([withRootProviders], memo(SubscribePageComponent), 'subscribe-page');
SubscribePage.displayName = 'CouchPage__Subscribe';

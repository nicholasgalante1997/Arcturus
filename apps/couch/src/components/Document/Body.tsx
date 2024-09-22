import React from 'react';
import { I18NProvider, WorkerContextProvider, ShelfContextProvider, WritProvider } from '@/contexts';

import { Aside } from '../Aside';

import RouteGuard from './RouteGuard';

import { type DocumentProps } from './types';

type BodyProps = Pick<DocumentProps, 'children' | 'pageCtx' | 'routeKey'>;
type ProviderProps = BodyProps;

function Body(props: BodyProps) {
  const { children, pageCtx, routeKey } = props;
  return (
    <body>
      <Providers pageCtx={pageCtx} routeKey={routeKey}>
        {children}
      </Providers>
    </body>
  );
}

function Providers(props: ProviderProps) {
  const { children, pageCtx, routeKey } = props;
  return (
    <I18NProvider>
      <WorkerContextProvider>
        <ShelfContextProvider>
          <WritProvider>
            <div id={pageCtx.id} className="couch-page heller2-theme" data-theme-mode="dark">
              <Aside />
              <div className="couch-page-main">
                <RouteGuard pageId={pageCtx.id} routeKey={routeKey}>
                  {children}
                </RouteGuard>
              </div>
            </div>
          </WritProvider>
        </ShelfContextProvider>
      </WorkerContextProvider>
    </I18NProvider>
  );
}

export default React.memo(Body);

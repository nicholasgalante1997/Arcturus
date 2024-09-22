import { I18NProvider, ShelfContextProvider, WorkerContextProvider, WritProvider } from '@/contexts';
import React, { memo } from 'react';
import { Aside } from '@/components/Aside';
import { combine } from '@/hocs';

function PageComponent({ children, id }: { children: React.ReactNode; id: string }): React.JSX.Element {
  return (
    <I18NProvider>
      <WorkerContextProvider>
        <ShelfContextProvider>
          <WritProvider>
            <div id={id} className="couch-page heller2-theme" data-theme-mode="dark">
              <Aside />
              <div className="couch-page-main">{children}</div>
            </div>
          </WritProvider>
        </ShelfContextProvider>
      </WorkerContextProvider>
    </I18NProvider>
  );
}

export const Root = combine([], memo(PageComponent), 'RootPageComponent');
Root.displayName = 'Couch__PageRoot';

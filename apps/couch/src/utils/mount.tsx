import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { setupAnalytics } from './web-vitals';

function mount<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  props: P = {} as any
): void {
  hydrateRoot(document, <Component {...props} />);
  if (process.env.NODE_ENV === 'production') {
    inject({ mode: 'production' });
    setupAnalytics();
  }
}

export { mount };

import React from 'react';
import { ErrorCode } from '@/components';
import { type RuntimeStage } from '@/config/client';
import { type RouteKey, RouteKeyMap } from '@/config/routes';
import { isServer } from '@/utils';

import { type HOCWrapperFn } from '../index';

export function withRouteGuard<P = {} & JSX.IntrinsicAttributes>(routeKey: RouteKey): HOCWrapperFn<P> {
  const kvArrayOrUndefined = Object.entries(RouteKeyMap).find(([_key, obj]) => {
    return obj.key === routeKey;
  });
  let canRenderRoute = false;
  const environment = process.env.RUNTIME_STAGE as RuntimeStage | undefined;
  if (kvArrayOrUndefined && environment) {
    const [, { environments }] = kvArrayOrUndefined;
    const stage = environments[environment];
    canRenderRoute = stage === 'public';
  }
  /** The page is public */
  if (isServer() || canRenderRoute) {
    return function (_id: string, Component: React.FC<P>) {
      // eslint-disable-next-line react/display-name
      return function (props: P) {
        return <Component {...(props as P & JSX.IntrinsicAttributes)} />;
      };
    };
  } else {
    /** The page is protected */
    return function (id: string, _Component: React.FC<P>) {
      // eslint-disable-next-line react/display-name
      return function (props: P) {
        return <ErrorCode code={401} id={id} error="ProtectedRoute" />;
      };
    };
  }
}

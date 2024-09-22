import React from 'react';

import { ErrorCode } from '@/components';
import { type RuntimeStage } from '@/config/client';
import { type RouteKey, RouteKeyMap } from '@/config/routes';
import { isServer } from '@/utils';

interface RouteGuardProps {
  children: React.ReactNode | React.ReactNode[];
  routeKey: string;
  pageId: string;
}

function RouteGuard(props: RouteGuardProps) {
  let canRenderRoute = false;
  const environment = process.env.RUNTIME_STAGE as RuntimeStage | undefined;
  const routeConf = getRoute(props.routeKey);
  if (routeConf && environment) {
    const [, { environments }] = routeConf;
    const stage = environments[environment];
    canRenderRoute = stage === 'public';
  }

  if (isServer() || canRenderRoute) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return <ErrorCode code={401} id={props.pageId} error="ProtectedRoute" />;
  }
}

export default React.memo(RouteGuard);

function getRoute(routeKey: string) {
  return Object.entries(RouteKeyMap).find(([_key, obj]) => {
    return obj.key === routeKey;
  });
}

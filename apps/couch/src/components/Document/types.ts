import { type RouteKey } from '@/config/routes';
import type React from 'react';

export interface DocumentProps {
  children: React.ReactNode | React.ReactNode[];
  styles: React.JSX.Element[];
  routeKey: RouteKey;
  pageCtx: {
    author?: AuthorLike | string;
    id: string;
    document: {
      description: string;
      title: string;
    };
  };
}

interface Author {
  name: string;
  email: string;
  media: {
    src: string;
  };
}

type AuthorLike = Partial<Author>;

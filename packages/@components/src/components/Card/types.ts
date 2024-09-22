import { HTMLProps } from 'react';

export interface CardProps extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'media' | 'action'> {
  media: string | JSX.Element;
  mediaAlt?: string;
  title: string;
  subtitle?: string;
  description: string;
  action: ButtonAction | LinkAction;
  scale?: number;
}

export interface MicroCardProps extends Omit<CardProps, 'media' | 'mediaAlt' | 'action'> {
    action: LinkAction;
}

interface ButtonAction {
  type: 'button';
  onChange: (event: React.FormEvent<HTMLButtonElement>) => void;
  label: string;
}

interface LinkAction {
  type: 'link';
  href: string;
  target?: HTMLProps<HTMLAnchorElement>['target'];
  label: string;
}

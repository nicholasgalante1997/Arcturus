import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Body, Heading } from '@project-arcturus/components';
import { MarkdownClassNames } from './classnames';

import { type SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { type NormalComponents } from 'react-markdown/lib/complex-types';

function getMarkdownComponents(): Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> {
  return {
    p: ({ node, children, ...rest }) => (
      <Body {...rest} style={{ marginBlock: '8px' }} as="p">
        {children}
      </Body>
    ),
    b: ({ node, children, ...rest }) => (
      <Body {...rest} bold as="p">
        {children}
      </Body>
    ),
    i: ({ node, children, ...rest }) => (
      <Body {...rest} italic as="p">
        {children}
      </Body>
    ),
    h1: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h1">
        {children}
      </Heading>
    ),
    h2: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h2">
        {children}
      </Heading>
    ),
    h3: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h3">
        {children}
      </Heading>
    ),
    h4: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h4">
        {children}
      </Heading>
    ),
    h5: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h5">
        {children}
      </Heading>
    ),
    h6: ({ node, children, ...rest }) => (
      <Heading {...rest} as="h6">
        {children}
      </Heading>
    )
  };
}

interface MarkdownProps {
  content: string;
}

function MarkdownComponent({ content }: MarkdownProps) {
  return (
    <ReactMarkdown components={getMarkdownComponents()} className={MarkdownClassNames.root}>
      {content}
    </ReactMarkdown>
  );
}

export const Markdown = memo(MarkdownComponent);

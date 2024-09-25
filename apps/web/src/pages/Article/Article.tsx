import React, { memo } from 'react';
import App, { AppProps } from '../App';

import { Article, type ArticleProps } from '@/components/Article';

export type Props = Omit<ArticleProps & AppProps, 'children'>;

function ArticlePage(props: Props) {
  return (
    <App app={props.app} document={props.document} theme={props.theme}>
      <Article series={props.series} article={props.article} />
    </App>
  );
}

export default memo(ArticlePage);

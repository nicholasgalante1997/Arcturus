import React from 'react';
import { toStatic } from '@project-arcturus/renderer';

import Article, { Props } from '@/pages/Article/Article';
import { getStaticProps } from './get-static-props';
import { getBundledJs } from './get-bundled-js';
import { ArticleSeries } from '@/types/ArticleSeries';

export async function build() {
  await toStatic([
    {
      Component: Article as React.ComponentType<Props>,
      name: 'tales-from-the-couch__babel__witchy-woman',
      outpath: 'dist/babel-1.html',
      hydration: {
        scripts: [{ src: getBundledJs('article')! }]
      },
      async getProps() {
        return await getStaticProps({
          description: 'Witchy Woman',
          filename: 'babel-1.html',
          series: ArticleSeries.COUCH__BABEL_CANON,
          title: 'Witchy Woman'
        });
      }
    },
    {
      Component: Article as React.ComponentType<Props>,
      name: 'tales-from-the-couch__babel__excerpts',
      outpath: 'dist/babel-3.html',
      hydration: {
        scripts: [{ src: getBundledJs('article')! }]
      },
      async getProps() {
        return await getStaticProps({
          description: "K'or Garoth",
          filename: 'babel-3.html',
          series: ArticleSeries.COUCH__BABEL_CANON,
          title: "K'or Garoth"
        });
      }
    }
  ]);
}

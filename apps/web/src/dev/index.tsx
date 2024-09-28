import '@project-arcturus/components/css/variables.css';
import '@project-arcturus/components/css/base.min.css';
import '@project-arcturus/components/css/button.min.css';

import '../../public/css/index.css';

import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import Article, { Props } from '@/pages/Article/Article';
import { ArticleSeries } from '@/types/ArticleSeries';
import { ArticleType } from '@/types/ArticleType';
import { WebsiteName } from '@/types/WebsiteName';

import { strings } from './data';

const props: Props = {
  app: {
    ui: {
      nav: {
        logoImgAltText: 'The simpsons couch against a bright purple backdrop of their living room.',
        logoImgSrc: '/assets/couch.jpg',
        websiteTitle: WebsiteName.CouchGag
      }
    }
  },
  article: {
    author: 'Washington Irving',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    headlineImg: '/assets/shoggoths-among-us.jpg',
    headlineImgAspectRatio: '16 / 9',
    headlineImgAltText: 'A Shoggoth reading in a library. Stencil, drawn style.',
    id: '01',
    release: 'September 20, 2024',
    title: 'Babel III - The One\'s That Came From Dreams, ',
    type: ArticleType.Fiction,
    headlineImgPublisher: 'Henry Farrell',
    series: ArticleSeries.COUCH__BABEL_CANON,
    content: strings.join('\n\n')
  },
  document: {
    head: {
      description: '',
      title: ''
    }
  },
  series: ArticleSeries.COUCH__BABEL_CANON,
  theme: 'light'
};

hydrateRoot(document, <Article {...props} />);

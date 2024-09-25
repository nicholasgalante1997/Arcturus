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
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
    headlineImg: '',
    headlineImgAltText: '',
    id: '',
    release: '20 September 2024',
    title: 'Babel III: Kor Na Garoth',
    type: ArticleType.Fiction,
    headlineImgPublisher: ''
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

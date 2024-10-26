import React from 'react';
import { ReactBrowserRenderer } from '@project-arcturus/renderer';

import Article, { Props } from './Article';

new ReactBrowserRenderer<Props>().setComponent(Article).render();

import '../styles/index.css';
import '../styles/browse.css';
import '../styles/landing-page.css';
import '../styles/story.css';

import 'heller-2-lite/css/variables.css';
import 'heller-2-lite/css/base.min.css';
import 'heller-2-lite/css/button.min.css';
import 'heller-2-lite/css/typography.min.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LandingPage, BrowsePage, StoryPage } from '@/pages';

import Stories from '../contexts/data/writ.json';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: 'browse',
    element: <BrowsePage />
  },
  ...Stories.metadata.map((story) => {
    return {
      path: story.slug,
      element: (
        <StoryPage
          imgAlt=""
          imgSrc={story.img}
          title={story.title}
          key={story.slug}
          author={story.author}
          content={''}
          description={story.subtitle}
          genres={story.genres || []}
        />
      )
    };
  })
]);

createRoot(document.documentElement).render(<RouterProvider router={routes} />);

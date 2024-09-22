const RouteKeyMapVersion = 0.1;

export const RouteKeyMap = {
  AboutPage: {
    key: `couch-gag-about-anchor-page-route-v${RouteKeyMapVersion}`,
    environments: {
      development: 'public',
      beta: 'public',
      gamma: 'public',
      production: 'public'
    }
  },
  BrowsePage: {
    key: `couch-gag-browse-page-route-v${RouteKeyMapVersion}`,
    environments: {
      development: 'public',
      beta: 'public',
      gamma: 'public',
      production: 'public'
    }
  },
  ErrorPage: {
    key: `couch-gag-error-page-route-v${RouteKeyMapVersion}`,
    environments: {
      development: 'public',
      beta: 'public',
      gamma: 'public',
      production: 'public'
    }
  },
  LandingPage: {
    key: `couch-gag-landing-page-route-v${RouteKeyMapVersion}`,
    environments: {
      development: 'public',
      beta: 'public',
      gamma: 'public',
      production: 'public'
    }
  },
  StoryPage: {
    key: `couch-gag-story-page-route-v${RouteKeyMapVersion}`,
    environments: {
      development: 'public',
      beta: 'public',
      gamma: 'public',
      production: 'public'
    }
  }
} as const;

export type RouteKey = (typeof RouteKeyMap)[keyof typeof RouteKeyMap]['key'];

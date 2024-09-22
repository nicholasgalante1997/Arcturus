import LandingPage from './landing';
import StoryPage from './story';
import BrowsePage from './browse';
import ErrorPage from './error';

type PageIndexingKey = 'browse' | 'error' | 'home' | 'story';

const PageRegistry = new Map<PageIndexingKey, React.FC<any>>([
  ['browse', BrowsePage],
  ['error', ErrorPage],
  ['home', LandingPage],
  ['story', StoryPage]
]);

export { BrowsePage, ErrorPage, LandingPage, PageRegistry, StoryPage };

import path from 'path';
import fs from 'fs';

import { BrowsePage, ErrorPage, LandingPage, StoryPage } from '@/pages';
import { type PageConfig } from '@/types';
import { type StoryProps } from '@/components';
import frontmatter from 'front-matter';

import { attempt, logger } from '@/utils';

function buildDescription(d: string): string {
  /** impl story description injection schema */
  return d;
}

function loadWritDirStories() {
  const storiesDir = path.resolve(process.cwd(), 'writ');
  return fs.readdirSync(storiesDir, { encoding: 'utf-8' });
}

function attemptLoadWritDirStories() {
  const { data, ok, error } = attempt(loadWritDirStories);
  if (data && ok) return data;
  else {
    logger.fatal(error || new Error('getPages():::UnknownException'));
    process.exit(2);
  }
}

function iterateThroughWritStories() {
  let configs: Array<PageConfig<StoryProps>> = [];
  for (const dir of attemptLoadWritDirStories()) {
    const newDirPath = path.resolve(process.cwd(), 'writ', dir);
    const stories = fs.readdirSync(newDirPath, { encoding: 'utf-8' });
    configs = Array.from(new Set(pushStories(configs, stories, newDirPath)));
  }
  return configs;
}

function pushStories(configs: Array<PageConfig<StoryProps>>, stories: string[], rootDir: string) {
  for (const story of stories) {
    const storyString = fs.readFileSync(path.resolve(rootDir, story), { encoding: 'utf-8' });
    const { attributes, body } = frontmatter<any>(storyString);
    const storyProps = buildStoryProps(attributes, body);
    configs.push(buildConfig(storyProps, attributes));
  }
  return configs;
}

function buildStoryProps(attributes: any, body: any): StoryProps {
  return {
    author: attributes?.author,
    content: body,
    description: attributes?.subtitle,
    genres: attributes?.genres,
    imgAlt: attributes?.subtitle,
    imgSrc: attributes?.img,
    title: attributes?.title
  };
}

function buildConfig(props: StoryProps, attributes: any) {
  return {
    bundle: 'story',
    component: StoryPage,
    description: buildDescription(attributes?.subtitle),
    htmlFileName: attributes?.slug,
    styles: ['story'],
    title: attributes?.title,
    props
  };
}

function buildStories(): Array<PageConfig<StoryProps>> {
  const { data, ok, error } = attempt(() => iterateThroughWritStories());
  if (data && ok) return data;
  else {
    logger.fatal(error || new Error('buildStories():::UnknownException'));
    process.exit(2);
  }
}

export const staticPages: Array<PageConfig<any>> = [
  {
    bundle: 'landing',
    component: LandingPage,
    title: 'The Couch Gag, A Collection Of Short Stories',
    description:
      "An anthology of short stories by new American authors. We are currently accepting submissions for our first season's release.",
    htmlFileName: 'index',
    styles: ['landing-page']
  },
  {
    bundle: 'browse',
    component: BrowsePage,
    title: 'The Couch Gag, Browse Stories',
    description: 'Search for stories contained within "The Couch Gag" seasons\'s 1 and 2.',
    htmlFileName: 'browse',
    styles: ['browse']
  },
  {
    bundle: 'error',
    component: ErrorPage,
    title: 'The Couch Gag, 404 Page',
    description: 'The Couch Gag fallback page',
    htmlFileName: '404',
    styles: []
  }
];

export const getPages = (): Array<PageConfig<{} | StoryProps>> => {
  try {
    const storyPageConfigs = buildStories();
    return [...storyPageConfigs, ...staticPages];
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

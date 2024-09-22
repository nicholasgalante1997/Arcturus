import path from 'node:path';
import { PageRegistry } from '@/pages';
import { type SleepyPageConf } from '@/types';
import SleepyConfig from '../../sleepy.json';
import { getStaticBundle } from './getStaticBundle';
import { getAllPosts } from './getPostsConf';

function getStaticPagesFromStaticConfig(): SleepyPageConf {
  return SleepyConfig.service_data.pages
    .filter(({ type, html }) => html && type === 'static')
    .map((page) => {
      return {
        name: page.bundle,
        Component: PageRegistry.get(page.component as any)!,
        outpath: path.resolve(process.cwd(), 'build', `${page.html}.html`),
        hydration: {
          scripts: [{ src: getStaticBundle(page.bundle, 'build') }]
        }
      };
    });
}

function getSleepyConfig(): SleepyPageConf {
  return [...getStaticPagesFromStaticConfig(), ...getAllPosts()];
}

export default getSleepyConfig;
export { getSleepyConfig };

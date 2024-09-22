import fs from 'node:fs';
import path from 'node:path';

import frontmatter from 'front-matter';

import { type StoryProps } from '@/components/Story';
import { type SleepyPageConf } from '@/types';
import { PageRegistry } from '@/pages';

import { getStaticBundle } from './getStaticBundle';

const dir = path.resolve(process.cwd(), 'writ', 'Season_1');

function getAllPosts(): SleepyPageConf {
  const dirents = fs.readdirSync(dir, { encoding: 'utf8', withFileTypes: true });
  return dirents
    .map((d) => {
      const { name, parentPath } = d;
      if (d.isFile()) {
        const file = fs.readFileSync(`${parentPath}/${name}`, { encoding: 'utf8' });
        try {
          const fm = frontmatter<any>(file);
          return {
            name,
            parentPath,
            file,
            data: fm
          };
        } catch (e) {
          console.error(e);
          console.error('getAllPosts has thrown an error during frontmatter parsing');
          throw e;
        }
      } else {
        return null;
      }
    })
    .filter((i) => i !== null)
    .map((fObj, index) => {
      return {
        name: 'story',
        Component: PageRegistry.get('story')!,
        outpath: path.resolve(
          process.cwd(),
          'build',
          `${(fObj?.data?.attributes?.slug as string) || ''}.html`
        ),
        hydration: {
          scripts: [{ src: getStaticBundle('story', 'build') }]
        },
        getProps: function (): StoryProps {
          return {
            author: fObj?.data.attributes?.author ?? '',
            description: fObj?.data?.attributes?.subtitle || '',
            title: fObj?.data?.attributes?.title || '',
            genres: fObj?.data?.attributes?.genres || [],
            content: fObj?.data?.body,
            imgAlt: 'TODO alt text',
            imgSrc: fObj?.data?.attributes?.img ?? ''
          };
        }
      };
    });
}

export { getAllPosts };

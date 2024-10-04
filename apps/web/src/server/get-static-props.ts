import frontmatter from 'front-matter';
import { ArticlePageProps } from '@/pages/Article';
import { ArticleData } from '@/types/ArticleData';
import { WebsiteName } from '@/types/WebsiteName';
import { ArticleSeries } from '@/types/ArticleSeries';

type Options = {
  filename: string;
  title: string;
  description: string;
  series: ArticleSeries;
};

export async function getStaticProps(
  options: Options
): Promise<Omit<ArticlePageProps, 'children'>> {
  const file = options.filename;
  const base = 'http://localhost:8080/';
  const url = base + file;
  const headers = {
    Accept: 'text/markdown',
    'Accept-Encoding': 'gzip, br'
  };
  const mode = 'no-cors' as const;
  const method = 'GET';
  const httpOptions = { headers, method, mode };
  const response = await fetch(url, httpOptions);
  const markdown = await response.text();
  const parsed = frontmatter<ArticleData>(markdown);

  return {
    app: {
      ui: {
        nav: {
          websiteTitle: WebsiteName.CouchGag
        }
      }
    },
    theme: 'light',
    document: {
      head: {
        title: options?.title,
        description: options?.description
      }
    },
    article: {
      author: parsed.attributes.author,
      description: parsed.attributes.description,
      headlineImg: '/assets/doodles.jpg',
      headlineImgAltText: parsed.attributes.headlineImgAltText,
      id: parsed.attributes.id,
      release: parsed.attributes.release,
      title: parsed.attributes.title,
      type: parsed.attributes.type,
      headlineImgPublisher: parsed.attributes.headlineImgPublisher,
      content: parsed.body,
      series: parsed.attributes.series,
      headlineImgAspectRatio: '16 / 9'
    },
    series: options?.series
  };
}

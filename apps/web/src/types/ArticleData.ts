import { ArticleSeries } from './ArticleSeries';
import { ArticleType } from './ArticleType';

export interface ArticleData {
  title: string;
  author: string;
  description: string;
  headlineImg: string;
  headlineImgAltText: string;
  headlineImgPublisher?: string;
  headlineImgAspectRatio?: string;
  release: string;
  id: string;
  series: ArticleSeries;
  type: ArticleType;
  content: string;
}

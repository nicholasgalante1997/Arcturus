import { ArticleType } from './ArticleType';

export interface ArticleData {
  title: string;
  author: string;
  description: string;
  headlineImg: string;
  headlineImgAltText: string;
  headlineImgPublisher?: string;
  release: string;
  id: string;
  type: ArticleType;
}

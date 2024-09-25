import { WebsiteName } from '@/types/WebsiteName';

export interface AppProps {
  children: React.ReactNode | React.ReactNode[];
  document: {
    head: {
      title: string;
      description: string;
    };
  };
  theme: 'light' | 'dark';
  app: {
    ui: {
      nav: {
        websiteTitle: WebsiteName;
        logoImgSrc: string;
        logoImgAltText: string;
      };
    };
  };
}

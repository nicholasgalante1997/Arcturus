import { gridId, mainContentOnEnter } from './animations';
import { Card } from '@/components/Card';
import { CardGridClassNames } from './classnames';
import React from 'react';
import classNames from 'classnames';
import { useOnElementEnter } from '@/hooks';

const mockCardProps = {
  image: 'https://coincu.com/wp-content/uploads/2022/07/111.png',
  alt: 'Doodles 2',
  title: 'Doodles: A Case Study In NFTs',
  description:
    "What is Doodles? Doodles is a collection of NFT's (Non-Fungible Tokens) that has emerged as a result of the past wave of interest in NFT baedased trading, as an alternative to traditional means of trading.",
  cta: {
    href: '#',
    text: 'Read More'
  }
};

export function CardGridComponent(): React.JSX.Element | React.ReactNode {
  useOnElementEnter(gridId, mainContentOnEnter);
  return (
    <div id={gridId} className={CardGridClassNames.Grid}>
      <div className={CardGridClassNames.HeadingRow}>
        <h1>Season One</h1>
        <button className="button-smpl">Browse</button>
      </div>
      <div className={CardGridClassNames.Row}>
        <Card type="full" size="lg" {...mockCardProps} />
        <Card type="full" size="lg" {...mockCardProps} />
        <div className={CardGridClassNames.Column}>
          <Card type="mini" size="sm" {...mockCardProps} />
          <Card type="mini" size="sm" {...mockCardProps} />
          <Card type="mini" size="sm" {...mockCardProps} />
        </div>
      </div>
      <div className={classNames(CardGridClassNames.Row, 'mt-4')}>
        <Card type="full" size="sm" {...mockCardProps} />
        <Card type="full" size="sm" {...mockCardProps} />
        <Card type="full" size="sm" {...mockCardProps} />
        <Card type="full" size="sm" {...mockCardProps} />
      </div>
      <div className={classNames(CardGridClassNames.Row, 'mt-4')}>
        <div className={CardGridClassNames.FlexHalf}>
          <div className={CardGridClassNames.Column}>
            <Card type="mini" size="lg" {...mockCardProps} />
            <Card type="mini" size="lg" {...mockCardProps} />
            <Card type="mini" size="lg" {...mockCardProps} />
          </div>
          <div className={CardGridClassNames.Column}>
            <Card type="mini" size="lg" {...mockCardProps} />
            <Card type="mini" size="lg" {...mockCardProps} />
            <Card type="mini" size="lg" {...mockCardProps} />
          </div>
        </div>
        <div className={CardGridClassNames.FlexHalf}>
          <img src="/snow-red.webp" alt="purple digital art" className={CardGridClassNames.Image} />
        </div>
      </div>
    </div>
  );
}

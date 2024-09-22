import React, { memo, useCallback } from 'react';
import classNames from 'classnames';

import { Body, Heading } from '@project-arcturus/components';
import { UilArrowDown } from '@iconscout/react-unicons';
import { Card } from '@/components/Card';

import { useTranslation, useWritContext } from '@/contexts';
import { combine } from '@/hocs';

import { BrowseComponentClassNames } from './classnames';

function BrowseComponent(): React.JSX.Element {
  const { t } = useTranslation();
  const { getAll } = useWritContext();

  const writ = getAll();

  const writToContentJsx = useCallback((writObject: (typeof writ)[number], _index: number) => {
    return (
      <Card
        size="lg"
        type="full"
        title={writObject.title}
        description={writObject.subtitle}
        key={writObject.slug}
        image={'/doodles2.webp'}
        cta={{ href: `/${writObject.slug}.html`, text: 'Read' }}
      />
    );
  }, []);

  const filterForSeasonOneStoriesOnly = (writObject: (typeof writ)[number]): boolean => {
    return writObject.seasonKey === '01';
  };

  return (
    <div className={BrowseComponentClassNames.Wrapper}>
      <div className={BrowseComponentClassNames.Column}>
        <div className={BrowseComponentClassNames.HeadingContainer}>
          <span role="heading" style={{ width: 'fit-content' }}>
            <Heading as="h1" className={BrowseComponentClassNames.Heading}>
              {t('browse_heading_season_one')}&nbsp;
            </Heading>
          </span>
          <Body as="p" bold className={classNames('mt-4', BrowseComponentClassNames.Subheading)}>
            {t('browse_heading_season_one_synopsis')}
          </Body>
          <a href="#couch__browse-cards" className="browse-component__arrow-down-pos-absolute">
            <UilArrowDown size="60" fill="#fff" />
          </a>
        </div>
        <div id="couch__browse-cards" className={BrowseComponentClassNames.CardGrid}>
          {writ
            .filter(filterForSeasonOneStoriesOnly)
            .sort((a, b) => a.order - b.order)
            .map(writToContentJsx)}
        </div>
      </div>
    </div>
  );
}

export const Browse = combine<{}>([], memo(BrowseComponent), 'browse-component');
Browse.displayName = 'Couch__BrowseComponent';

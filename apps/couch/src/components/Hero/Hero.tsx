import React, { memo, useCallback } from 'react';

import { Body, Button, Heading } from '@project-arcturus/components';

import { useTranslation } from '@/contexts';
import { combine } from '@/hocs';
import { HeroImageClassnames } from './classnames';
import { to } from '@/utils';
import classNames from 'classnames';

function HeroImageComponent(): JSX.Element {
  const { t } = useTranslation();
  const readOnClick = useCallback(() => {
    to('/browse.html');
  }, []);

  return (
    <div className={HeroImageClassnames.Container}>
      <div className={HeroImageClassnames.MiniCol}>
        <span role="heading" style={{ width: 'fit-content' }}>
          <Heading as="h1" className={classNames(HeroImageClassnames.Title, 'haas-bold')}>
            {t('lp_title_shard_1')} {t('lp_title_shard_2')} {t('lp_title_shard_3')}
          </Heading>
        </span>

        <Body as="p" className={HeroImageClassnames.Text}>
          {t('lp_subtext_block')}
        </Body>

        <div className={HeroImageClassnames.Row}>
          <Button
            onClick={readOnClick}
            className={HeroImageClassnames.Button}
            size="small"
            hover={{ animationType: 'background-transition' }}
            rounded
          >
            {t('lp_action_cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Hero = combine<{}>([], memo(HeroImageComponent), 'lp-hero');
Hero.displayName = 'Couch__HeroComponent';

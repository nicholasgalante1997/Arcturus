import React, { memo } from 'react';
import { Body, Button, Heading } from '@project-arcturus/components';
import { useTranslation } from '@/contexts';
import { combine } from '@/hocs';

import { SubscribeBannerClassNames } from './classnames';

function SubscribeBannerComponent(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div className={SubscribeBannerClassNames.Wrapper}>
      <Heading as="h6" className={SubscribeBannerClassNames.Text} style={{ color: 'black' }}>
        {t('lp_sub_banner_text_shard_1')}{' '}
        <Body as="span" className={SubscribeBannerClassNames.Span}>
          {t('lp_sub_banner_span_text')}
        </Body>{' '}
        {t('lp_sub_banner_text_shard_2')}
      </Heading>
      &nbsp;
      <Button hover={{ animationType: 'scale-content' }} v="tertiary" className="ls" size="small">
        {t('lp_sub_banner_cta')}
      </Button>
    </div>
  );
}

export const SubscribeBanner = combine([], memo(SubscribeBannerComponent), 'subscribe-banner');
SubscribeBanner.displayName = 'Couch__SubscribeBannerComponent';

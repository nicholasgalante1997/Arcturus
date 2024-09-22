import React, { memo } from 'react';
import { combine } from '@/hocs';
import { imageContainerId, imageContainerOnEnter, mainContentId, mainContentOnEnter } from './animations';
import { ContributeBannerClassNames } from './classnames';
import { useOnElementEnter } from '@/hooks';
import { useTranslation } from '@/contexts';

function ContributeBannerComponent(): JSX.Element {
  const { t } = useTranslation();
  useOnElementEnter(mainContentId, mainContentOnEnter);
  useOnElementEnter(imageContainerId, imageContainerOnEnter);
  return (
    <div className={ContributeBannerClassNames.Wrapper}>
      <div id={mainContentId} className={ContributeBannerClassNames.MainContent}>
        <h1 className={ContributeBannerClassNames.Title}>{t('lp_contribute_banner_title')}</h1>
        <p className={ContributeBannerClassNames.Text}>{t('lp_contribute_banner_text')}</p>
        <button className="button-smpl mt-3">{t('lp_contribute_banner_cta')}</button>
      </div>
      <div id={imageContainerId} className={ContributeBannerClassNames.ImageContainer}>
        <img
          src="digital-art-purple.jpg"
          alt="purple digital art"
          className={ContributeBannerClassNames.Image}
        />
      </div>
    </div>
  );
}

export const ContributeBanner = combine<{}>([], memo(ContributeBannerComponent), 'lp-contribute-banner');
ContributeBanner.displayName = 'Couch__ContributeBannerComponent';

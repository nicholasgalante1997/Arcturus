import React, { memo } from 'react';
import { combine } from '@/hocs';
import { ShelfWidgetClassNames } from './classnames';
import { shelfBannerId } from './animations';
import { useTranslation } from '@/contexts';

function ShelfWidgetComponent(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div id={shelfBannerId} className={ShelfWidgetClassNames.Wrapper}>
      <p className={ShelfWidgetClassNames.Text}>
        {t('lp_shelf_banner_text_shard_1')}&nbsp;
        <span className={ShelfWidgetClassNames.Span}>{t('lp_shelf_banner_span_text')}</span>&nbsp;
        {t('lp_shelf_banner_text_shard_2')}
      </p>
      &nbsp;
      <button className="button-smpl">{t('lp_shelf_banner_cta')}</button>
    </div>
  );
}

export const ShelfWidget = combine<{}>([], memo(ShelfWidgetComponent), 'lp-shelf-widget');
ShelfWidget.displayName = 'Couch__ShelfWidgetComponent';

/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useMemo, useState } from 'react';
import { combine } from '@/hocs';
import { isServer, toTitleCase } from '@/utils';
import { ContentWidgetClassNames } from './classnames';
import { type ContentWidgetComponentProps } from './types';
import classNames from 'classnames';
import { useTranslation } from '@/contexts';

/** @deprecated 10/08/23 */
function ContentWidgetComponent({
  backgroundColor,
  foregroundColor: color,
  slug,
  subtitle,
  supportingTheme,
  title,
  shadingDirection,
  seasonKey,
  episodeKey,
  genres,
  img
}: ContentWidgetComponentProps): React.JSX.Element {
  const { t } = useTranslation();
  const isLightThemed = useMemo(() => supportingTheme === 'light', [supportingTheme]);
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  async function onCopy(slug: string): Promise<void> {
    if (!isServer()) {
      try {
        const copyText = `${window.location.protocol}//${window.location.hostname}/${slug}.html`;
        await window.navigator.clipboard.writeText(copyText);
        setHasBeenCopied(true);
        setTimeout(() => {
          if (hasBeenCopied) {
            setHasBeenCopied(false);
          }
        }, 5000);
      } catch (e) {}
    }
  }
  const shadingClassName = useMemo(
    () =>
      classNames({
        [ContentWidgetClassNames.ShadingCommon]: true,
        [ContentWidgetClassNames.DarkShadingRight]: supportingTheme === 'dark' && shadingDirection === 'r',
        [ContentWidgetClassNames.DarkShadingLeft]: supportingTheme === 'dark' && shadingDirection === 'l',
        [ContentWidgetClassNames.LightShadingRight]: supportingTheme === 'light' && shadingDirection === 'r',
        [ContentWidgetClassNames.LightShadingLeft]: supportingTheme === 'light' && shadingDirection === 'l'
      }),
    [shadingDirection, supportingTheme]
  );
  const imageContainerClassName = useMemo(
    () =>
      classNames({
        [ContentWidgetClassNames.ImageContainerLeft]: shadingDirection === 'r',
        [ContentWidgetClassNames.ImageContainerRight]: shadingDirection === 'l'
      }),
    [shadingDirection]
  );
  return (
    <div style={{ backgroundColor }} className={ContentWidgetClassNames.Container}>
      <div className={shadingClassName}>
        <div className={imageContainerClassName}>
          <img className={ContentWidgetClassNames.Image} src={img} alt="Need alt text" />
        </div>
        <div className={ContentWidgetClassNames.Content}>
          <h1 style={{ color }}>{toTitleCase(title.split(' '))}</h1>
          <p style={{ color: isLightThemed ? 'black' : 'white' }}>{subtitle}</p>
          <p style={{ color: isLightThemed ? 'black' : 'white' }}>
            {t('content_widget_season')}&nbsp;
            <span style={{ color }} className="pac">
              {seasonKey}
            </span>
            &nbsp;{t('content_widget_episode')}&nbsp;
            <span style={{ color }} className="pac">
              {episodeKey}
            </span>
          </p>
          {genres && genres.length > 0 && (
            <p style={{ color: isLightThemed ? 'black' : 'white' }}>
              {t('content_widget_talks_about')}&nbsp;
              {genres.map((g) => (
                <span key={g} style={{ color }} className="pac ml-1 mr-1">
                  {g} |
                </span>
              ))}
            </p>
          )}
          <div className={ContentWidgetClassNames.ButtonRow}>
            <a href={`/${slug}.html`} target="_self" role="button" className="button-smpl">
              {t('content_widget_action')}
            </a>
            <button onClick={() => onCopy(slug)} className="button-smpl">
              {hasBeenCopied ? 'Copied!' : t('content_widget_share')}
            </button>
            <button className="button-smpl">{t('content_widget_shelf')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ContentWidget = combine<ContentWidgetComponentProps>(
  [],
  memo(ContentWidgetComponent),
  'content-widget'
);

ContentWidget.displayName = 'Couch__ContentWidgetComponent';

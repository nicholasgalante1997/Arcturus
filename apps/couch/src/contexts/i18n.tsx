import React, { createContext, memo, type ReactNode, useContext, useEffect, useState } from 'react';
import { AppStrings } from '@/locales';
import { type Locale } from '@/types';
import { logger } from '@/utils';
import { combine } from '@/hocs';

async function updateAppStrings(locale: string, update: (blob: typeof AppStrings) => void): Promise<void> {
  try {
    const resolvedModule = await import(
      /* webpackInclude: /\.json$/ */
      /* webpackChunkName: "i18n-strings" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      `../locales/${locale}/app.json`
    ).then((mod) => mod.default);
    update(resolvedModule);
  } catch (e: any) {
    logger.error('I18NException');
    logger.error(e);
  }
}

const I18NContext = createContext<typeof AppStrings>(AppStrings);

type UseTranslationFunction = () => {
  t: (key: string) => string | undefined;
  media: (key: string) => string | undefined;
  raw: typeof AppStrings;
};

export const useTranslation: UseTranslationFunction = () => {
  const i18nPool = useContext(I18NContext);
  const { assets, resources } = i18nPool;
  function t(key: string): string | undefined {
    return resources[key as keyof (typeof AppStrings)['resources']];
  }
  function media(key: string): string | undefined {
    return assets[key as keyof (typeof AppStrings)['assets']];
  }
  return { t, media, raw: i18nPool };
};

function I18NProviderComponent({
  children,
  locale = 'en'
}: {
  children: ReactNode;
  locale?: Locale;
}): React.JSX.Element | React.ReactNode {
  const [langStrings, setLangStrings] = useState(AppStrings);
  useEffect(() => {
    if (locale !== 'en') {
      updateAppStrings(locale, (updatedStrings) => {
        setLangStrings(updatedStrings);
      }).catch((e) => {
        logger.error(e);
      });
    }
  }, [locale]);
  return <I18NContext.Provider value={langStrings}>{children}</I18NContext.Provider>;
}

export const I18NProvider = combine([], memo(I18NProviderComponent), 'I18NProvider');
I18NProvider.displayName = 'CouchContext__I18NProviderComponent';

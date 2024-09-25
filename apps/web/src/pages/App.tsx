import React, { useState } from 'react';
import { Overlay } from '@/components/Overlay';
import { Nav } from '@/components/Nav';
import { OverlayContext } from '@/contexts/Overlay';
import { ThemeContext } from '@/contexts/Theme';
import { AppProps } from './App.types';

function App({ app, children, document: { head }, theme }: AppProps) {
  const [$theme, setTheme] = useState<AppProps['theme']>(theme);
  const [$overlay, setOverlay] = useState(false);

  const openOverlay = () => setOverlay(true);
  const closeOverlay = () => setOverlay(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <link rel="prefetch" as="stylesheet" href="css/index.css" />
        <link rel="stylesheet" href="css/index.css" />
        <link rel="prefetch" as="stylesheet" href="css/variables.css" />
        <link rel="stylesheet" href="css/variables.css" />
        <link rel="prefetch" as="stylesheet" href="css/base.min.css" />
        <link rel="stylesheet" href="css/base.min.css" />
        <link rel="prefetch" as="stylesheet" href="css/button.min.css" />
        <link rel="stylesheet" href="css/button.min.css" />
        <link rel="prefetch" as="stylesheet" href="css/typography.min.css" />
        <link rel="stylesheet" href="css/typography.min.css" />
        <link rel="prefetch" as="stylesheet" href="css/card.min.css" />
        <link rel="stylesheet" href="css/card.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-arc-theme={$theme}>
        <ThemeContext.Provider value={{ setTheme, theme: $theme }}>
          <OverlayContext.Provider value={{ open: openOverlay, close: closeOverlay }}>
            <Nav
              websiteTitle={app.ui.nav.websiteTitle}
              logoImgAltText={app.ui.nav.logoImgAltText}
              logoImgUrl={app.ui.nav.logoImgSrc}
            />
            {!$overlay && <main id="arc-root">{children}</main>}
            {$overlay && <Overlay />}
          </OverlayContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}

export default App;

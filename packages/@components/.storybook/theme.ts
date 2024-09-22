import { create } from '@storybook/theming';
import {
  colorBaseBlackGamma,
  colorBaseSynthwaveBluePrimary,
  colorBaseSynthwavePurpleQuadratic,
  colorBaseWhiteAlpha,
  colorFontDarkContrastHigh,
  colorFontDarkContrastMedium
} from 'heller-2-lite';
import couchWebp from '../assets/couch-rounded.webp';

export default create({
  base: 'dark',
  fontBase: 'system-ui, "Open Sans", sans-serif',
  brandTitle: 'heller-2',
  brandImage: couchWebp,
  brandTarget: '_self',
  colorPrimary: colorBaseSynthwaveBluePrimary,
  colorSecondary: colorBaseSynthwavePurpleQuadratic,
  appBg: colorBaseBlackGamma,
  appContentBg: colorBaseBlackGamma,
  appPreviewBg: colorBaseWhiteAlpha,
  textColor: colorFontDarkContrastHigh,
  textInverseColor: colorFontDarkContrastMedium,
  barBg: colorBaseWhiteAlpha
});

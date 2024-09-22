import '../../heller-2-lite/build/css/variables.css';

import '../../heller-2-lite/build/css/alert.min.css';
import '../../heller-2-lite/build/css/base.min.css';
import '../../heller-2-lite/build/css/button.min.css';
import '../../heller-2-lite/build/css/card.min.css';
import '../../heller-2-lite/build/css/flexbox.min.css';
import '../../heller-2-lite/build/css/glasspane.min.css';
import '../../heller-2-lite/build/css/grid.min.css';
import '../../heller-2-lite/build/css/link.min.css';
import '../../heller-2-lite/build/css/spacing.min.css';
import '../../heller-2-lite/build/css/typography.min.css';

import './sb.css';
import './DocTemplate.css';

import type { Preview } from '@storybook/react';
import theme from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme
    }
  }
};

export default preview;

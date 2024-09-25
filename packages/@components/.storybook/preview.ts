import type { Preview } from '@storybook/react';

import '@project-arcturus/design-tokens/css/variables.css';
import '@project-arcturus/design-tokens/css/base.min.css';

import '@project-arcturus/design-tokens/css/alert.min.css';
import '@project-arcturus/design-tokens/css/button.min.css';
import '@project-arcturus/design-tokens/css/card.min.css';
import '@project-arcturus/design-tokens/css/flexbox.min.css';
import '@project-arcturus/design-tokens/css/glasspane.min.css';
import '@project-arcturus/design-tokens/css/grid.min.css';
import '@project-arcturus/design-tokens/css/link.min.css';
import '@project-arcturus/design-tokens/css/spacing.min.css';
import '@project-arcturus/design-tokens/css/typography.min.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

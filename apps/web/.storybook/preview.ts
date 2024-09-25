import '@project-arcturus/design-tokens/css/variables.css';
import '@project-arcturus/design-tokens/css/base.min.css';
import '@project-arcturus/design-tokens/css/button.min.css';
import '../public/css/index.css';

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

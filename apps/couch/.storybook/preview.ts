import type { Preview } from "@storybook/react";

import 'heller-2-lite/css/variables.css';
import 'heller-2-lite/css/alert.min.css';
import 'heller-2-lite/css/base.min.css';
import 'heller-2-lite/css/button.min.css';
import 'heller-2-lite/css/card.min.css';
import 'heller-2-lite/css/flexbox.min.css';
import 'heller-2-lite/css/glasspane.min.css';
import 'heller-2-lite/css/grid.min.css';
import 'heller-2-lite/css/link.min.css';
import 'heller-2-lite/css/spacing.min.css';
import 'heller-2-lite/css/typography.min.css';

import '../src/styles/index.css';
import '../src/styles/fonts.css';
import '../src/styles/palette.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Overlay from './Overlay';

const meta: Meta<typeof Overlay> = {
  title: 'components/widgets/Overlay',
  component: Overlay
};

export default meta;

type OverlayStory = StoryObj<typeof Overlay>;

export const Main: OverlayStory = {
  render: () => <Overlay />
};

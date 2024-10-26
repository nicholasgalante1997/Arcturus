import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

type IconStory = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: 'components/base/Icon',
  component: Icon
};

export default meta;

export const HamburgerMenu: IconStory = {
  render: () => <Icon icon="hamburger-menu" height="60px" width="60px" />
};

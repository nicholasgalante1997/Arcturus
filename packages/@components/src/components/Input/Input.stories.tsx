import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/Core/Input',
  component: Input
};

export default meta;

export const Primary: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Service Name'
  },
  render: (args) => <Input {...args} />
};

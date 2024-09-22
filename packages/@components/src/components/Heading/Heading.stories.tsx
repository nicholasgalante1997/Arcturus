import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    as: 'h1'
  }
};

export default meta;

type HeadingStory = StoryObj<typeof Heading>;

export const Primary: HeadingStory = {
  render: (args) => <Heading {...args}>Twenty Thousand Leagues Under the Sea</Heading>
};

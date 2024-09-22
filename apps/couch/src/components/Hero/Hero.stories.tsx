import '@/styles/hero.css';

import { type Meta, type StoryObj } from '@storybook/react';
import React from 'react';

import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  component: Hero,
  title: 'components/Hero',
  args: {},
  decorators: [],
  parameters: {}
};

export default meta;

type HeroStory = StoryObj<typeof Hero>;

export const Main: HeroStory = {
  render: (args: any) => <Hero {...args} />
};

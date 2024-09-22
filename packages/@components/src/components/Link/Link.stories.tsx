import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  decorators: [],
  args: {
    children: 'For more information, visit our messageboard.',
    href: '#'
  }
};

export default meta;

export const Main: StoryObj<typeof Link> = {
  render: (args) => <Link {...args} />
};

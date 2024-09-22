import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import Flexbox from './Flexbox';

const meta: Meta<typeof Flexbox> = {
  title: 'Layout/Flexbox',
  component: Flexbox,
  args: {
    dir: 'row',
    gap: 'md'
  }
};

export default meta;

const divStyle = {
  minHeight: '200px',
  minWidth: '200px',
  borderRadius: '6px',
  ':hover': { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }
};

type FlexboxStoryType = StoryObj<typeof Flexbox>;

export const Playground: FlexboxStoryType = {
  render: (args) => (
    <Flexbox {...args}>
      <div style={{ ...divStyle, background: 'blue' }}>Flex Box 1</div>
      <div style={{ ...divStyle, background: 'magenta' }}>Flex Box 2</div>
      <div style={{ ...divStyle, background: 'lightgreen' }}>Flex Box 3</div>
    </Flexbox>
  )
};

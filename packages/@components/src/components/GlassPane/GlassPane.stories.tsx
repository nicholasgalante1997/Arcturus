import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';

import { GlassPane } from './GlassPane';

const style = {
  height: '500px',
  width: '500px',
  overflow: 'hidden',
  backgroundImage: 'url(./couch.webp)',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
  padding: '48px'
};

const meta: Meta<typeof GlassPane> = {
  title: 'GlassPane',
  component: GlassPane,
  decorators: [
    (Story) => (
      <div style={style as any}>
        <Story />
      </div>
    )
  ],
  args: {
    blur: 'normal',
    mode: 'light',
    height: 200,
    width: 200,
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      font: 'Ubuntu',
      borderRadius: '10px'
    },
    children: <p>Glass Pane!</p>
  }
};

export default meta;

export const Main: StoryObj<typeof GlassPane> = {
  render: (args) => <GlassPane {...args} />
};

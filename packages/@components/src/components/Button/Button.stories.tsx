import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { colorBaseBlackAlpha, colorBaseWhiteAlpha } from 'heller-2-lite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button
};

export default meta;

type ButtonStoryType = StoryObj<typeof Button>;

const containerStyle = (mode: string) =>
  ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '16px',
    boxSizing: 'border-box',
    margin: 0,
    padding: '16px',
    background: mode === 'light' ? colorBaseWhiteAlpha : colorBaseBlackAlpha,
    height: '500px',
    width: '500px'
  }) as React.CSSProperties;

export const PrimaryLight: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => <Button {...args}>Click Me</Button>
};

export const PrimaryLightRounded: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  args: { rounded: true },
  render: (args) => <Button {...args}>Click Me</Button>
};

export const SecondaryLight: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="secondary" {...args}>
      Click Me
    </Button>
  )
};

export const TertiaryLight: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="tertiary" {...args}>
      Click Me
    </Button>
  )
};

export const NoirLight: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="noir" {...args}>
      Click Me
    </Button>
  )
};

export const PrimaryDark: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="dark" style={containerStyle('dark')}>
        <Story />
      </div>
    )
  ],
  render: (args) => <Button {...args}>Click Me</Button>
};

export const SecondaryDark: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="dark" style={containerStyle('dark')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="secondary" {...args}>
      Click Me
    </Button>
  )
};

export const TertiaryDark: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="dark" style={containerStyle('dark')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="tertiary" {...args}>
      Click Me
    </Button>
  )
};

export const NoirDark: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="dark" style={containerStyle('dark')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="noir" {...args}>
      Click Me
    </Button>
  )
};

export const Hover_RaiseElevation: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="primary" size="medium" hover={{ animationType: 'raise-elevation' }} {...args}>
      Click Me
    </Button>
  )
};

export const Hover_TransitionBG: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="primary" size="medium" hover={{ animationType: 'background-transition' }} {...args}>
      Click Me
    </Button>
  )
};

export const Hover_Scale: ButtonStoryType = {
  decorators: [
    (Story) => (
      <div className="heller2-theme" data-theme-mode="light" style={containerStyle('light')}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Button v="primary" size="medium" hover={{ animationType: 'scale-content' }} {...args}>
      Click Me
    </Button>
  )
};

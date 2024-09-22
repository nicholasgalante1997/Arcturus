import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Body } from './Body';

const meta: Meta<typeof Body> = {
  title: 'Typography/Body',
  component: Body
};

export default meta;

type BodyStory = StoryObj<typeof Body>;

const content_alpha = "That's a load balancing candy cane,";
const content_beta = 'you clumsy oaf!';
const author = '- The Simpsons';

export const BodyMain: BodyStory = {
  render: (args) => (
    <Body {...args} as="p">
      {content_alpha}{' '}
      <Body as="span" italic bold>
        {content_beta}
      </Body>{' '}
      {author}
    </Body>
  )
};

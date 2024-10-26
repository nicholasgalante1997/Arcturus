import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Nav from './Nav';
import { WebsiteName } from '@/types/WebsiteName';

type NavStory = StoryObj<typeof Nav>;

const meta: Meta<typeof Nav> = {
  title: 'components/widgets/Nav',
  component: Nav
};

export default meta;

export const NavWidget: NavStory = {
  render: () => (
    <Nav
      logoImgAltText="The Simpsons Couch"
      logoImgUrl="/assets/couch.jpg"
      websiteTitle={WebsiteName.CouchGag}
    />
  )
};

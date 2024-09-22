import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import Grid from './Grid';
import GridItem from './GridItem';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid
};

export default meta;

type GridStory = StoryObj<typeof Grid>;

let Header = () => (
  <GridItem style={{ background: 'magenta' }} rowStart={1} rowEnd={1} colStart={1} colEnd={13}>
    <p>Grid Heading</p>
  </GridItem>
);

let Aside = () => (
  <GridItem style={{ background: 'cyan', height: '200px' }} rowStart={2} rowEnd={2} colStart={1} colEnd={3}>
    <p>Aside Inside the Grid</p>
  </GridItem>
);

let Footer = () => (
  <GridItem style={{ background: 'lightgreen' }} rowStart={3} rowEnd={3} colStart={1} colEnd={13}>
    <footer>Footer</footer>
  </GridItem>
);

export const Playground: GridStory = {
  render: (args) => (
    <Grid {...args}>
      <Header />
      <Aside />
      <Footer />
    </Grid>
  )
};

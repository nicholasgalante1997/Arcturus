import React from 'react';
import { render } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  test('Snapshot', () => {
    const { container } = render(<Heading as="h1">Shmallas</Heading>);
    expect(container).toMatchSnapshot();
  });
});

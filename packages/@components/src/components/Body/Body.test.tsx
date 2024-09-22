import React from 'react';
import { render } from '@testing-library/react';
import { Body } from './Body';

describe('Body', () => {
  test('Snapshot', () => {
    const { container } = render(<Body as="p">Shmallas</Body>);
    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  test('Snapshot', () => {
    const { container } = render(<Link>More Information</Link>);
    expect(container).toMatchSnapshot();
  });
});

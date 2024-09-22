import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  test('Snapshot', () => {
    const body = 'A longer description of the event or cause of the alert dispatch.';
    const heading = 'A brief note';
    for (const severity of ['info', 'error', 'success', 'warning']) {
      const { container } = render(<Alert severity={severity as any} message={{ heading, body }} />);
      expect(container).toMatchSnapshot();
    }
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import MicroCard from './MicroCard';

describe('Card', () => {
  describe('MicroCard', () => {
    test('Snapshot', () => {
        const jsx = <MicroCard action={{href: "#", label: 'Read', type: 'link', target: '_self'}} description='Stub' title='Stub' />;
        const { container } = render(jsx);
        expect(container).toMatchSnapshot();
    });
  });
  describe('Card', () => {
    test('Snapshot', () => {
        const jsx = <Card media="stub" mediaAlt="alt-stub" action={{href: "#", label: 'Read', type: 'link', target: '_self'}} description='Stub' title='Stub' />;
        const { container } = render(jsx);
        expect(container).toMatchSnapshot();
    });
  });
});

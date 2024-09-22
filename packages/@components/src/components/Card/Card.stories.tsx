import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Card from './Card';
import MicroCard from './MicroCard';

const meta: Meta<typeof Card> = {
    title: 'components/Card',
    component: Card
};
export default meta;

export const CardPG: StoryObj<typeof Card> = {
    args: {
        title: "Air Max 90",
        media: "./air-max.jpeg",
        mediaAlt: "Red Nike Air Max Shoes, side profile.",
        subtitle: "Popular",
        description: "A popular favorite is back for a limited time. Maximum order number 25. Ships August 2024.",
        action: {
            type: "button",
            label: "Add to Cart",
            onChange: () => alert('Added to cart!')
        }
    },
    render: (args) => <Card {...args} />
};

export const MicroCardPG: StoryObj<typeof MicroCard> = {
    args: {
        title: "Air Max 90",
        subtitle: "Popular",
        description: "A popular favorite is back for a limited time. Maximum order number 25. Ships August 2024.",
        action: {
            type: "link",
            label: "Add to Cart",
            href: "#",
            target: "_self"
        }
    },
    render: (args) => <MicroCard {...args} />
};
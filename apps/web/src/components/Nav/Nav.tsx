import React, { memo } from 'react';
import { Button } from '@project-arcturus/components';
import { Props as NavProps } from './Nav.types';
import Icon from '../Icon/Icon';

function Nav({ logoImgAltText, logoImgUrl, websiteTitle }: NavProps) {
  return (
    <nav className="navbar">
      <span className="navitem logo">
        <img src={logoImgUrl} alt={logoImgAltText} height="64px" width="auto" />
      </span>

      <span className="navitem menu">
        <Icon icon="hamburger-menu" height="48px" width="48px" />
      </span>

      <span className="navitem title">
        <h1 className="fira-sans-bold">{websiteTitle}</h1>
      </span>

      <span className="navitem subscribe">
        <Button rounded className="fira-sans-bold">
          Subscribe
        </Button>
      </span>
    </nav>
  );
}

export default memo(Nav);

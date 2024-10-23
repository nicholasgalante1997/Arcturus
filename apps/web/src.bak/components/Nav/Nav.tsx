import React, { memo } from 'react';
import { Props as NavProps } from './Nav.types';
import Icon from '../Icon/Icon';
import { useOverlayContext } from '@/contexts/Overlay';

function Nav({ websiteTitle }: NavProps) {
  const { close, isOpen, open } = useOverlayContext();
  return (
    <nav className="navbar">
      <span className="navitem logo">
        <span className="letter strange">T</span>
      </span>

      <span className="navitem menu" onClick={isOpen ? close : open}>
        <Icon icon="hamburger-menu" height="24px" width="24px" />
      </span>

      <span className="navitem title">
        <a target="_self" href="/" className="strange">{websiteTitle}</a>
      </span>

      <span className="navitem subscribe">
        Subscribe
      </span>
    </nav>
  );
}

export default memo(Nav);

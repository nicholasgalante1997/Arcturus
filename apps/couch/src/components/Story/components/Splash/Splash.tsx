import React, { memo } from 'react';
import { type StoryProps } from '../../types';

function StorySplash({ title, description }: Partial<StoryProps>) {
  return (
    <div className="story_splash-hero-container">
      <span style={{ width: 'fit-content' }}>
        <h1 className="alt-haas-bold">{title}</h1>
      </span>

      <p className="alt-haas-regular">{description}</p>
    </div>
  );
}

export default memo(StorySplash);

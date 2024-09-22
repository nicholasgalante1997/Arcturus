import React, { memo } from 'react';
import { colorBaseBluePrimary } from '@project-arcturus/design-tokens';
import { Heading } from '@project-arcturus/components';

import { StoryClassNames } from '../../classnames';
import { type StoryProps } from '../../types';

function StoryTitle({ title }: Partial<StoryProps>) {
  return (
    <div className={StoryClassNames.TitleContainer}>
      <Heading as="h1" style={{ color: colorBaseBluePrimary }}>
        {title}
      </Heading>
    </div>
  );
}

export default memo(StoryTitle);

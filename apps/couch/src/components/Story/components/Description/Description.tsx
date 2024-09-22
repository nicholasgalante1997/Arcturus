import React, { memo } from 'react';
import { colorBaseGrayEpsilon } from '@project-arcturus/design-tokens';
import { Body } from '@project-arcturus/components';

import { StoryClassNames } from '../../classnames';
import { type StoryProps } from '../../types';
import { useTranslation } from '@/contexts';

function StoryDescription({ description, author }: Partial<StoryProps>) {
  const { t } = useTranslation();
  return (
    <div className={StoryClassNames.SubContainer}>
      <Body as="p" style={{ color: colorBaseGrayEpsilon }} bold className={StoryClassNames.Description}>
        {description}
      </Body>
      <Body as="p" className={StoryClassNames.Author}>
        {[t('story_author_by'), author].join(' ')}
      </Body>
    </div>
  );
}

export default memo(StoryDescription);

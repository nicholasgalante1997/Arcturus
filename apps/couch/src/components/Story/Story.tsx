import React, { memo } from 'react';

import { Markdown } from '@/components/Markdown';

import { combine } from '@/hocs';

import { StoryClassNames } from './classnames';
import { type StoryProps } from './types';

import StoryTitle from './components/Title';
import StoryDescription from './components/Description';
import StoryActionContainer from './components/ActionContainer';

function StoryComponent({ title, description, author, content }: StoryProps): React.JSX.Element {
  return (
    <div className={StoryClassNames.Wrapper}>
      <StoryTitle title={title} />
      <StoryDescription description={description} author={author} />
      <StoryActionContainer />
      <article className={StoryClassNames.ArticleContent}>
        <Markdown content={content} />
      </article>
    </div>
  );
}

export const Story = combine<StoryProps>([], memo(StoryComponent), 'story-component');
Story.displayName = 'Couch__StoryPageComponent';

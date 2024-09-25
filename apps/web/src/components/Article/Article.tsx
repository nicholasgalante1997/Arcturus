import React, { memo } from 'react';
import { Props } from './Article.types';

function Article(props: Props) {
  return (
    <section className="article">
      <article></article>
    </section>
  );
}

export default memo(Article);

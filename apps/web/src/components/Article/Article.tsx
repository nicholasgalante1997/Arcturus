import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Props } from './Article.types';

function Article(props: Props) {
  return (
    <section className="article-container">
      <article className="article-root">
        <div className="article-supplementary-info-container text-container">
          <span className="article-date fira-sans-semibold">{props.article.release}</span>
          <span className="article-supp-divider" />
          <span className="article-series fira-sans-semibold">
            <i>from</i> <b>the {props.article.series} Series</b>
          </span>
        </div>

        <div className="article-title-container text-container">
          <h1 className="article-title fira-sans-bold">{props.article.title}</h1>
        </div>

        <div className="article-description-container text-container">
          <p className="article-description noto-serif">{props.article.description}</p>
        </div>

        <div className="article-author-container text-container">
          <p className="article-author noto-serif">
            by {props.article.author}
          </p>
        </div>

        <div className="article-headline-image-container">
          <img
            src={props.article.headlineImg}
            alt={props.article.headlineImgAltText}
            style={{ aspectRatio: props.article?.headlineImgAspectRatio }}
            className="article-headline-image"
          />
          <span className="article-headline-image-publisher">
            {props.article.headlineImgPublisher}
          </span>
        </div>

        <ReactMarkdown
          className="article-markdown-root"
          skipHtml>
          {props.article.content}
        </ReactMarkdown>
      </article>
    </section>
  );
}

export default memo(Article);

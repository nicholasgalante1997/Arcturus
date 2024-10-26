import { ChipElementBuilder } from './Chip.js';
import { error } from '../../log/index.js';

class CardElementBuilder {
  #title;
  #desc;
  #link;
  #publishDate;
  #readingTime;
  #labels;
  #author;

  constructor() {}

  setTitle(title) {
    this.#title = title;
    return this;
  }

  setDescription(desc) {
    this.#desc = desc;
    return this;
  }

  setLink(link) {
    this.#link = link;
    return this;
  }

  setPublishingDate(publishingDate) {
    this.#publishDate = publishingDate;
    return this;
  }

  setReadingTime(readingTime) {
    this.#readingTime = readingTime;
    return this;
  }

  setLabels(labels) {
    if (Array.isArray(this.#labels)) {
      this.#labels = Array.from(new Set([...this.#labels, labels]));
    } else {
      this.#labels = labels;
    }

    return this;
  }

  setAuthor(author) {
    this.#author = author;
    return this;
  }

  toElement() {
    if (!this.#validateSelf()) {
      error(new Error('Card malformed'));
      return null;
    }

    const root = this.#createRootElement();
    const minorInfoRoot = this.#createMinorInfoWrapperElement();
    const readingTimeRoot = this.#createMinorInfoReadingTimeContainerElement();
    const readingTimeText = this.#createMinorInfoReadingTimeBoldTextElement(this.#readingTime);
    const heading = this.#createTitleElement(this.#title);
    const chipRoot = this.#createMinorInfoChipsContinerElement();
    const description = this.#createMinorInfoDescription(this.#desc);
    const link = this.#createLink();

    readingTimeRoot.appendChild(readingTimeText);
    chipRoot.append(
      ...this.#labels.map((label) => new ChipElementBuilder().setLabel(label).toElement())
    );

    minorInfoRoot.append(readingTimeRoot, heading, chipRoot, description, link);
    root.appendChild(minorInfoRoot);

    return root;
  }

  #createRootElement() {
    const container = document.createElement('div');
    container.className = 'post-card';
    container.dataset.intent = 'display';
    return container;
  }

  #createMinorInfoWrapperElement() {
    const container = document.createElement('div');
    container.className = 'post-card__minor-info';
    return container;
  }

  #createMinorInfoReadingTimeContainerElement() {
    const container = document.createElement('div');
    container.className = 'minor-info__reading-time';
    return container;
  }

  #createMinorInfoReadingTimeBoldTextElement(innerText) {
    const textElement = document.createElement('b');
    const text = document.createTextNode(innerText);
    textElement.appendChild(text);
    return textElement;
  }

  #createTitleElement(innerText) {
    const titleElement = document.createElement('h1');
    const text = document.createTextNode(innerText);
    titleElement.appendChild(text);
    return titleElement;
  }

  #createMinorInfoChipsContinerElement() {
    const container = document.createElement('div');
    container.className = 'minor-info__chips';
    return container;
  }

  #createMinorInfoDescription(innerText) {
    const p = document.createElement('p');
    const text = document.createTextNode(innerText);
    p.appendChild(text);
    return p;
  }

  #createLink() {
    const a = document.createElement('a');
    a.href = this.#link;
    const text = document.createTextNode('Read More');
    a.appendChild(text);
    return a;
  }

  #validateSelf() {
    return Boolean(
      this.#author &&
        this.#desc &&
        this.#labels &&
        this.#link &&
        this.#publishDate &&
        this.#readingTime &&
        this.#title
    );
  }
}

export { CardElementBuilder };

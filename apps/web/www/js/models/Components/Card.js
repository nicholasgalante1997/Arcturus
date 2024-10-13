import { ChipElementBuilder } from "./Chip.js";

class CardElementBuilder {
    #title;
    #desc;
    #link;
    #publishDate;
    #readingTime;
    #labels;
    #author;

    constructor(){}

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
        if (!this.#validateSelf()) return;
        const container = document.createElement('div');
        container.className = 'post-card';
        container.dataset.intent = 'display';
        container.innerHTML = `
            <div class="post-card__minor-info">
                <div class="minor-info__reading-time">
                  <b>${this.#readingTime}</b>
                </div>
                <h1>${this.#title}</h1>
                <div class="minor-info__chips">
                  ${this.#labels.map(label => new ChipElementBuilder().setLabel(label).toString())}
                </div>
                <p>${this.#desc}</p>
                <a href="#">Read More</a>
            </div>
        `;

        return container;
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

export { CardElementBuilder }
class ChipElementBuilder {
    #emoji
    #label

    setLabel(label) {
        this.#label = label;
        return this;
    }

    setEmoji(emoji) {
        this.#emoji = emoji;
        return this;
    }

    toElement() {
        return this.#createSpan();
    }

    toString() {
        return `<span class="post-card__chip">${this.#label.toUpperCase()}</span>`;
    }

    #createSpan() {
        const container = document.createElement('span');
        container.className = 'post-card__chip';
        const text = document.createTextNode(this.#label.toUpperCase());
        container.appendChild(text);
        return container;
    }
}

export { ChipElementBuilder }
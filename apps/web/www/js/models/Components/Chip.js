class ChipElementBuilder {
    #emoji
    #label

    constructor(){}

    setLabel(label) {
        this.#label = label;
        return this;
    }

    setEmoji(emoji) {
        this.#emoji = emoji;
        return this;
    }

    toString() {
        return `<span class="post-card__chip">${this.#label.toUpperCase()}</span>`;
    }
}

export { ChipElementBuilder }
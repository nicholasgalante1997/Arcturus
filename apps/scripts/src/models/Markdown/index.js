import fm from "front-matter";

class Markdown {
  #doc;
  #attrs;
  #body;
  constructor(doc) {
    this.#doc = doc;
    const $fmdoc = fm(this.$doc);
    this.#attrs = $fmdoc.attributes || {};
    this.#body = $fmdoc.body;
  }

  get attrs() {
    return this.#attrs;
  }

  get body() {
    return this.#body;
  }

  get $doc() {
    return this.#doc;
  }

  getAttribute(key) {
    return this.#attrs[key];
  }
}

export default Markdown;

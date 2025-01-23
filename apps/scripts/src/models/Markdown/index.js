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

  valid() {
    return Boolean(
      this.getAttribute("slug") &&
      this.getAttribute("title") &&
      this.getAttribute("description") &&
      this.getAttribute("author") &&
      this.getAttribute("category") &&
      this.getAttribute("archCategory") &&
      this.getAttribute("searchTerms") &&
      this.getAttribute("genres") &&
      this.getAttribute("releaseDate") &&
      this.getAttribute("estimatedReadingTime") &&
      this.getAttribute("media") &&
      this.body
    );
  }
}

export default Markdown;

import debug from 'debug';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

class MarkdownHelper {

    /**
     * @private
     */
    static #window = new JSDOM('').window;

    /**
     * @private
     */
    static #dompurifier = DOMPurify(MarkdownHelper.#window);

    /**
     * @private
     */
    static #logger = debug('project-arcturus:models:markdown-helper');

    /**
     * @summary
     * Converts a markdown string to html (sanitized)
     * @param {string} markdown 
     * @returns {Promise<string>}
     */
    static async convert(markdown) {
        try {
            return MarkdownHelper.#dompurifier.sanitize(await marked.parse(markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")));
        } catch(e) {
            MarkdownHelper.#logger('MarkdownLogger:::convert failed.');
            
            if (e instanceof Error) {
                MarkdownHelper.#logger('Error: %s', e?.name);
                MarkdownHelper.#logger('Error Message: %s', e?.message);
                MarkdownHelper.#logger('Stack Trace: %s', e?.stack);
                return;
            }

            MarkdownHelper.#logger(e);

            throw e;
        }
    }
}

export default MarkdownHelper;
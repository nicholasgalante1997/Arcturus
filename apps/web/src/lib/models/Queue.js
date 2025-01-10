/**
 * @template T
 *
 * @typedef {Object} QueueOptions
 * @property {Object} [iterator]
 * @property {boolean} [iterator.consumptive]
 * @property {Array<T>} [initial]
 */

/**
 * @template T
 * @class Queue<T>
 * @type {Queue<T>}
 * @classdesc
 *
 * A basic javascript FIFO queue implementation
 */
export default class Queue {
  /**
   * @private
   * @type {Array<T>}
   */
  #internalQueue;

  /**
   * @private
   * @type {QueueOptions<T>['iterator']}
   */
  #iteratorOptions;

  /**
   * @param {QueueOptions<T>} [options]
   */
  constructor(options = {}) {
    this.#internalQueue = options?.initial || [];
    this.#iteratorOptions = options?.iterator || { consumptive: false };
  }

  /**
   * @summary Add an item to the back of the queue
   * @param {T} item
   */
  enqueue(item) {
    this.#internalQueue.push(item);
  }

  /**
   * @summary Remove a specific item from the queue. If no item is supplied, remove the next item in the queue.
   * @param {T} item
   * @returns {T | null}
   */
  dequeue(item = null) {
    if (this.empty()) return null;

    if (item) {
      const index = this.#internalQueue.indexOf(item);
      if (index > -1) {
        return this.#internalQueue.splice(index, 1)[0];
      }
    }

    /**
     * Javascript shift() implementation is notoriously non-performant
     * We can circumvent this by grabbing the element at index 0
     * and then reassigning our internal array
     * to the sliced remainder of itself.
     */
    const element = this.peek();
    this.#internalQueue = this.#internalQueue.slice(1);
    return element;
  }

  /**
   * @summary Returns a reference to the next item in the queue.
   * @returns {T | null}
   */
  peek() {
    return this.#internalQueue[0];
  }

  /**
   * @summary Checks if the current queue is empty
   * @returns {boolean}
   */
  empty() {
    return this.#internalQueue.length === 0;
  }

  /**
   * @summary The size of the queue
   * @type {number}
   */
  get size() {
    return this.#internalQueue.length;
  }

  /**
   * @public
   * @param {(a: T, b: T) => number} comparator
   */
  sort(comparator) {
    this.#internalQueue.sort(comparator);
  }

  *[Symbol.iterator]() {
    if (this.#iteratorOptions.consumptive) {
      while (!this.empty()) {
        yield this.dequeue();
      }
    } else {
      for (let i = 0; i < this.#internalQueue.length; i++) {
        yield this.#internalQueue[i];
      }
    }
  }
}

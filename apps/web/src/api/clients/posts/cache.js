import { LRUCache } from 'lru-cache';
import { LazySingleton } from 'sleepydogs';

class PostsCache {
    /**
     * @type {LRUCache<string, Record<string, any>>}
     */
    #cache = new LRUCache({
        max: 10000,
        maxSize: 10000,
        sizeCalculation(v, k) {
            return 1;
        },
        ttl: 1000 * 60 * 60 * 24 * 7,
        allowStale: false
    });

    /**
     * Adds a key-value pair to the cache.
     *
     * @param {string} k - The key associated with the value to be stored in the cache.
     * @param {Record<string, any>} v - The value to be stored in the cache.
     */
    add(k, v) {
        this.#cache.set(k, v);
    }

    /**
     * Retrieves a value from the cache.
     *
     * @param {string} k - The key associated with the value to be retrieved from the cache.
     * @returns {Record<string, any> | undefined} - The value associated with the key if it is present in the cache, otherwise undefined.
     */
    get(k) {
        return this.#cache.get(k);
    }

    getAll() {
        return Array.from(this.#cache.values());
    }
}

export default LazySingleton(PostsCache);
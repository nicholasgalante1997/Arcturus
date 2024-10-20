import LibraryManager from '../../api/Library.js';
import { info } from '../../log/index.js';
import Store from '../../store/index.js';

const { dispatch, subscribe, useStore } = Store;

export const runLoadPostsKey = 'load.posts';

export async function runLoadPostsIntoStateJob() {
    await LibraryManager.loadPosts();
    const posts = LibraryManager.getAll();
    info('Posts');
    info({ posts });
    dispatch({ type: 'set.posts', data: posts });
}
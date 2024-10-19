import { createStore } from '../vendor/@project-arcturus/store.js';

const defaultState = {
    posts: []
};

const ACTION_MAP = new Map([
    ['set.posts', ]
]);

function reducer(state = defaultState, action) {
    const { type, data } = action;
    
}
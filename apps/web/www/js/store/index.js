import { createStore } from '../vendor/@project-arcturus/store.js';

const defaultState = {
  posts: []
};

function reducer(state = defaultState, action) {
  const { type, data } = action;
  switch (type) {
    case 'set.posts': {
      if (Array.isArray(data)) {
        return {
          ...state,
          posts: data
        };
      }
    }
  }
}

export default createStore(reducer, defaultState);
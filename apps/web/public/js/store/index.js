import merge from 'lodash.merge';

function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  const useStore = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  };

  return { useStore, dispatch, subscribe };
}

const defaultState = {
  posts: [],
  ui: {
    home: {
      categories: {
        active: ['Software Engineering'],
        all: []
      }
    }
  }
};

function reducer(state = defaultState, action) {
  const { type, data } = action;
  switch (type) {
    case 'set': {
      return merge(state, data);
    };
    default: {
      return state;
    }
  }
}

export default createStore(reducer, defaultState);

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
    settings: {
      visibleCategories: ['WEB DEVELOPMENT', 'FICTION', 'CONTENT AND MEDIA', 'FOOTBALL']
    }
  }
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

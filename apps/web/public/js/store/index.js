import merge from 'lodash.merge';

function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  const useStore = () => state;

  /**
   * Dispatches an action to the store, which causes the reducer to be
   * called with the current state and the action. The new state is then
   * set to the result of the reducer, and all listeners are notified of
   * the new state.
   *
   * @param {Object} action An object containing information about the
   * action that was performed. Must contain a `type` property, which
   * indicates the type of action that was performed. May contain a `data` property.
   */
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
  };

  
  /**
   * Adds a listener to the list of listeners. The listener will be called
   * whenever the state of the store changes. The listener is passed the new
   * state of the store.
   *
   * @param {(state: Object) => void} listener A function that takes the new state of the store
   * as its only argument. The function is called whenever the state of the
   * store changes.
   *
   * @returns {() => void} A function that can be called to unsubscribe the
   * listener. The unsubscribe function takes no arguments.
   */
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

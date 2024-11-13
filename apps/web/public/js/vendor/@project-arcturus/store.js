// src/index.ts
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
export {
  createStore
};
//# sourceMappingURL=bundle.mjs.map

type Reducer<State, Action> = (state: State | undefined, action: Action) => State;
type Listener<State> = (state: State) => (void | Promise<void>);
type StateGetterFunction<State> = () => State;

function createStore<State, Action>(reducer: Reducer<State, Action>, initState: State) {
  let state: State | undefined = initState;
  let listeners: Listener<State>[] = [];

  const useStore: StateGetterFunction<State> = () => state!;

  const dispatch = (action: Action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state!));
  };

  const subscribe = (listener: Listener<State>) => {
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

export { createStore };
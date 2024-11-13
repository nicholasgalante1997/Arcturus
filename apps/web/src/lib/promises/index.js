function isPromise(value) {
    return Boolean(value && value instanceof Promise);
}

export { isPromise };
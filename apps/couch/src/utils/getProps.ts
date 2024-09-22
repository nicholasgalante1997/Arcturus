function getProps<T = any>() {
  const propsElement = typeof window !== 'undefined' ? document.getElementById('couch-gag-dy-props') : null;
  if (propsElement) {
    const dataAsString = propsElement.textContent;
    if (!dataAsString) {
      return null;
    }
    const data = JSON.parse(dataAsString) as T;
    propsElement.remove();
    return data;
  }
  return null;
}

export { getProps };

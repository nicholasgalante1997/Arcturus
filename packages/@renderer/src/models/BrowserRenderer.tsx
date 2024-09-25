import React from "react";
import { hydrateRoot } from "react-dom/client";

class BrowserRenderer<Props = {}> {
  private Component: React.ComponentType<Props> | null = null;
  
  setComponent(Component: React.ComponentType<Props>) {
    this.Component = Component;
    return this;
  }

  render() {
    const props = this.getProps();
    const Component = this.Component!;
    hydrateRoot(document, <Component {...(props as any)} />, {
      onRecoverableError(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
      },
    });
  }

  private getProps(): Props {
    if (typeof window !== "undefined") {
      const { data = null } = (window as any).__APP_PROPS__ || {};
      const props: Props = data ? data : {};
      return props;
    }

    return {} as Props;
  }
}

export default BrowserRenderer;

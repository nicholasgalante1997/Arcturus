import React, { memo } from 'react';
import { logger } from '@/utils';

type ChildNode = React.JSX.Element | React.ReactNode | React.ReactElement;

interface ErrorBoundaryProps {
  id?: string;
  lazy?: boolean;
  hide?: boolean;
  fallback?: ChildNode;
  children: ChildNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    logger.warn('ErrorBoundary encountered an error thrown during child rendering.');
    logger.error(error);
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: { componentStack: any } & Record<string, unknown>): void {
    logger.error(error);
    logger.error(info.componentStack);
  }

  render(): React.JSX.Element | React.ReactNode {
    if (this.state.hasError && !this.props.hide && this.props.fallback) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const ErrorWrapper = memo(ErrorBoundary);

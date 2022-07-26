import React from 'react';

type Props = {
  children: any;
};
type State = {
  hasError: boolean;
  error: string;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message || error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. {this.state.error}</h1>;
    }

    return this.props.children;
  }
}

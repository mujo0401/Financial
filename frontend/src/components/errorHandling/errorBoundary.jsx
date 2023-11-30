import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null // Initialize errorInfo here
    };
  }

  static getDerivedStateFromError(error) {
    return {
        hasError: true,
        error: error
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error and info to the console
    console.error("Error caught in ErrorBoundary:", error);
    console.error("Error info:", errorInfo);
  
    // Update the state so the next render will show the fallback UI.
    this.setState({
      error: error,
      errorInfo: errorInfo // Store errorInfo in state
    });
  }

  render() {
    if (this.state.hasError) {
      // Display a fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

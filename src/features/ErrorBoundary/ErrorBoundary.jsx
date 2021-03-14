import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };  
    }

    // componentDidCatch(error, errorInfo) {}

    render() {
        if (this.state.hasError) {
            return (
                <div className="fallback fallback-error">
                    <h1>Something went wrong :(</h1>
                    <p>Please try refreshing the page</p>
                </div>
            )   
        }
        return this.props.children; 
    }
}
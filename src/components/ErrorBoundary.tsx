import React from 'react';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * Error Boundary Component
 * 
 * Catches React component errors and prevents white screen of death.
 * Shows user-friendly error message with option to reload.
 * 
 * Usage:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);

    // Store error info in state
    this.setState({ errorInfo });

    // TODO: Send error to error tracking service (Sentry, LogRocket, etc.)
    // Example:
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReload = () => {
    // Clear error state and reload page
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A] p-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#FF5914]/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-[#FF5914]" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-semibold text-[#1C1B1F] dark:text-[#F6F7F9] mb-3">
              Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p className="text-[#49454F] dark:text-[#798A9B] mb-6">
              We've encountered an unexpected error. Our team has been notified and we're working on a fix.
            </p>

            {/* Error Details (Development Mode Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl text-left">
                <p className="text-sm font-medium text-[#FF5914] mb-2">
                  Error Details (Dev Mode):
                </p>
                <p className="text-xs text-[#49454F] dark:text-[#798A9B] font-mono break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-[#49454F] dark:text-[#798A9B] cursor-pointer hover:text-[#1E88E5]">
                      View Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-[#49454F] dark:text-[#798A9B] overflow-auto max-h-64">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={this.handleReload}
                className="w-full min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200"
              >
                Go to Dashboard
              </Button>

              <Button
                onClick={() => window.location.reload()}
                className="w-full min-h-12 px-6 py-2.5 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full transition-all duration-200"
              >
                Reload Page
              </Button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-[#798A9B] mt-6">
              If this problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

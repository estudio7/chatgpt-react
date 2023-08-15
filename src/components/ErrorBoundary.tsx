import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: any) {
		// Update state to indicate an error has occurred
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// Fallback UI to show when an error occurs
			return <div>Something went wrong. Please try again later.</div>;
		}

		// Render children if no error
		return this.props.children;
	}
}

export default ErrorBoundary;

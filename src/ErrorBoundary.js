import React from 'react';
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            redirect: false
        };

    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }

    //going to run wheneve the state or props change
    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true }), 5000)
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        if (this.state.hasError) {
            return (
                <h1>Error occured while fetching
                    <Link to="/">Click here</Link>
                    to go to home or wait here for 5 secs
                </h1>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
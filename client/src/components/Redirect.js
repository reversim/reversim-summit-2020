import React, { Component } from 'react';

const Redirect = WrappedComponent => class extends Component {
  componentWillMount() {
    if (this.props.fetchComplete && !this.props.user) {
      const to = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/auth/google?returnTo=${to}`;
    }
  }

  render() {
    return this.props.fetchComplete && this.props.user ? <WrappedComponent {...this.props} /> : null;
  }
};

export default Redirect;
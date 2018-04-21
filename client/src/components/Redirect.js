import React, { Component } from 'react';

function redirect() {
  const to = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `/auth/google?returnTo=${to}`;
}

const Redirect = WrappedComponent => class extends Component {
  componentWillMount() {
    if (this.props.fetchComplete && !this.props.user) {
      redirect();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.fetchComplete && nextProps.fetchComplete && !nextProps.user) {
      redirect();
    }
  }

  render() {
    return this.props.fetchComplete && this.props.user ? <WrappedComponent {...this.props} /> : null;
  }
};

export default Redirect;
import React, { Component } from 'react';

const Redirect = WrappedComponent => class extends Component {
  componentWillMount() {
    if (this.props.fetchComplete && !this.props.user) {
      window.location.href = '/auth/google';
    }
  }

  render() {
    return this.props.fetchComplete && this.props.user ? <WrappedComponent {...this.props} /> : null;
  }
};

export default Redirect;
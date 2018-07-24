import React, {Component} from 'react';

export function getLoginUrl() {
  const to = encodeURIComponent(window.location.pathname + window.location.search);
  return `/auth/google?returnTo=${to}`;
}

function redirect() {
  window.location.href = getLoginUrl();
}

const Redirect = WrappedComponent =>
  class extends Component {
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
      return this.props.fetchComplete && this.props.user ? (
        <WrappedComponent {...this.props} />
      ) : null;
    }
  };

export default Redirect;

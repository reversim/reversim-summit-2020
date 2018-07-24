import React from 'react';
import store from '../store';

const withStore = Component => {
  return props => (
    <Component {...store} {...props}>
      {props.children}
    </Component>
  );
};

export default withStore;

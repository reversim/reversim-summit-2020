import React, { PropTypes } from 'react';
import styles from 'css/styles';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => {
  return (
    <div className={styles.app}>
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;

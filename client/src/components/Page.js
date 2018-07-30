import React, {Component} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {REVERSIM_SUMMIT} from '../utils';

class Page extends Component {
  componentDidMount() {
    document.title = this.props.title
      ? `${this.props.title} · ${REVERSIM_SUMMIT}`
      : REVERSIM_SUMMIT;
  }

  render() {
    const {
      children,
      isHome,
      user,
      isSmallScreen,
      onLogout,
      location,
      history,
      eventConfig,
    } = this.props;
    return (
      <div style={isHome ? {} : {paddingTop: 160}}>
        <Navbar
          isHome={isHome}
          user={user}
          isSmallScreen={isSmallScreen}
          onLogout={onLogout}
          pathname={location.pathname}
          history={history}
          eventConfig={eventConfig || {}}
        />
        {children}
        <Footer user={user} />
      </div>
    );
  }
}

export default Page;

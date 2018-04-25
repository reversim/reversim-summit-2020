import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import { REVERSIM_SUMMIT } from '../utils';


class Page extends Component {

  componentDidMount() {
    document.title = this.props.title ? `${this.props.title} · ${REVERSIM_SUMMIT}` : REVERSIM_SUMMIT;
  }

  render() {
      const { children, isHome, user, isSmallScreen, onLogout, location, history } = this.props;
      return (
          <div style={isHome ? {} : { paddingTop: 105 }}>
            <Navbar isHome={isHome} user={user} isSmallScreen={isSmallScreen} onLogout={onLogout} pathname={location.pathname} history={history} />
            {children}
            <Footer />
          </div>
      );
  }

}

export default Page;
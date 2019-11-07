import React, {Component} from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import {REVERSIM_SUMMIT} from '../utils';

//styled-components components
const Main = styled.div`
 ${ ({ theme: { font }}) => `
 font-family: ${font.main};
 line-height: 1.5;
 `}
  min-height: ${props => props.isHome ? ` ` : `100vh`};
  display: ${props => props.isHome ? ` ` : `flex`};
  flex-direction: ${props => props.isHome ? ` ` : `column`};
`;

//React components
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
      isSingleContent,
    } = this.props;

    return (
      <Main
        // style={isHome ? {} : {minHeight: '100vh', display: 'flex', flexDirection: 'column'}}
        className={isSingleContent ? 'page-single-content' : ''}>
        <Navbar
          isHome={isHome}
          user={user}
          isSmallScreen={isSmallScreen}
          onLogout={onLogout}
          pathname={location.pathname}
          history={history}
          eventConfig={eventConfig || {}}
        />
        <div className="page">{children}</div>
        <Footer isSmallScreen={isSmallScreen}/>
      </Main>
    );
  }
}

export default Page;

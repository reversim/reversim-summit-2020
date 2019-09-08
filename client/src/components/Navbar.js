/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Container as ReactstrapContainer,
  Navbar as ReactstrapNavbar,
  Collapse,
  NavbarToggler,
  Nav,
  Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import {
  logo,
  navLink,
  newTag,
  newLink,
  navbarOpen
} from './Navbar.css';
import logoImg from '../images/SVG/nav-logo.svg';
import Avatar from './Avatar';
import {isServer} from '../utils';
import {REVERSIM_SUMMIT} from '../utils';
import { getLoginUrl } from "./Redirect";
import newImg from '../images/new-nav-tag.png';
import LinkDuo from './LinkDuo';
import styled from 'styled-components';

// styled-components section
const NavbarContainer = styled.div`
  nav  {
    padding: 25px 30px;
    ${props => {
      if(props.isColored){
        return (
          `background: ${props.theme.color.background_1};
           transition: background 0.3s;`
          )
        };
      }
    };
  };
`;

const MainAligner = styled.div`
 width: 100%;
 display: flex;
 justify-content: space-between;
`;

const NavItemAligner = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-end !important;
 padding: ${props => props.theme.space.l} !important;
 padding-left: 0;
 margin-left: auto !important;
 margin-bottom: 0;
 list-style: none;
 @media (min-width: ${props => props.theme.mq.l}){
  flex-direction: row;
  padding: 0 !important;
 };
`;

const NavbarButton = styled.a`
  width: max-content;
  height: 40px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none; /*consider deleting*/
  padding: 0 20px 0.75rem 20px;
  line-height: 2.25;
  letter-spacing: 1px;
  
  color: #fff;
  border: solid 2px #fff !important;
  box-shadow: -2px 2px #5127ff, -4px 4px #fff !important;
  background-color: #896cff;
  /* background-size: 205% 100% !important; */
  
  outline: none;
  border-radius: 0;

  font-family: 'PT Mono' !important;
  font-weight: bold !important;

  &:hover{ 
    background: linear-gradient(to right, #ff6100 50%, #896cff 50%);
    background-size: 200% 100%;
    transition: all .5s ease-out;
    text-decoration: none;
    color: #fff;
    /* could not figure out how to add th transition effect */
  };
`;

    // Navbar Inner Container
    // Reactstrap's container had also a behavioral aspect which led to a better UI.. We need to decied on that.
// const NavInnerContainer = styled.div`
    
//     width: 100%;
//     display: flex;
//     flex-wrap: nowrap;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 ${props => props.theme.space.l};
//     margin-right: auto;
//     margin-left: auto;
//     `

// React.js componenets section

const GetTicketsCTA = () => (
    <NavbarButton 
    href="https://ti.to/reversim-summit/2019">
      Get Tickets
    </NavbarButton>
  
);

const NavbarItem = ({to, text, external, pathname}) => {
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  const isNew = to === 'sponsors'
  return (
    <li key={to} className="text-white ml-lg-5 font-weight-bold font-size-md">
      <LinkDuo className={cn(navLinkClass, isNew? newLink: '')} to={to} external={!!external}>
        {isNew && <img className={newTag} src={newImg}/>}
        {text}
      </LinkDuo>
    </li>
  );
};

class Navbar extends Component {
  state = {
    isOpen: false,
    fixed: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentWillMount() {
    if (window.scrollY > 60) {
      this.setState({fixed: true});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const fixed = window.scrollY > 60;
    this.setState({fixed});
  };

  render() {
    const {
      isHome,
      isSmallScreen,
      user,
      onLogout,
      pathname,
      history,
      eventConfig: {
        cfp,
        voting,
      },
    } = this.props;
    const {fixed, currentPage: _currentPage} = this.state;
    const items = navItems(isHome);
    const isColored = !isHome || fixed;

    const logoEl = (
      <img className={logo} src={logoImg} onClick={() => history.push('/')} alt={REVERSIM_SUMMIT} />
    );

    const navbarBrand = isHome ? (
      <a href="/">{logoEl}</a>
    ) : (
      <Link className="navbar-brand mr-5" to="/">
        {logoEl}
      </Link>
    );

    return (
      <NavbarContainer isColored={isColored}>
        <ReactstrapNavbar
          expand="lg"
          fixed="top"
        >
          <ReactstrapContainer>
            <MainAligner>
              {navbarBrand}
              <NavbarToggler onClick={this.toggle} className="ml-auto" />
            </MainAligner>
            <Collapse isOpen={this.state.isOpen} navbar>
              <NavItemAligner>
                <Nav
                  navbar
                  className={navbarOpen ? 'navbarOpen': ''}
                  >
                  {!isSmallScreen && (
                    <li> <GetTicketsCTA /> </li>
                  )}
                  {cfp && isSmallScreen && pathname !== '/cfp' && (
                    <NavbarItem 
                      text="Submit session" 
                      to="cfp"
                    />
                  )}
                  {voting && isSmallScreen && pathname !== '/my-votes' && (
                    <NavbarItem 
                      text="VOTE FOR SESSION" 
                      to="proposals"
                    />
                  )}
                  {items.map(item => (
                    <NavbarItem 
                      key={`navbar-i-${item.to}`}
                      pathname={pathname}
                      {...item} 
                    />
                  ))}
                  { voting && (
                    <NavbarItem
                      key={`navbar-i-proposals`}
                      pathname={pathname}
                      {...{to: 'proposals', text: 'Proposals'}}
                    />
                  )}
                  {isSmallScreen && user}
                  {!user && (
                    <NavbarItem
                      to={getLoginUrl()}
                      text="Login"
                      external={true}
                    />
                  )}
                  {!isServer && isSmallScreen && user && (
                    <li>
                      <div className="ml-5">
                        {<Avatar {...user} onLogout={onLogout} />}
                      </div>
                    </li>
                  )}
                </Nav>
              </NavItemAligner>

            </Collapse>
          </ReactstrapContainer>
        </ReactstrapNavbar>
      </NavbarContainer>
      
    );
  }
}


export default Navbar;

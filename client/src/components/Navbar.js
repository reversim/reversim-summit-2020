/* eslint-disable prettier/prettier */
import React, {Component, useEffect} from 'react';
import cn from 'classnames';
import styled from 'styled-components';

import {
  Container as ReactstrapContainer,
  Navbar as ReactstrapNavbar,
  Collapse,
  NavbarToggler,
  Nav
} from 'reactstrap';
import {Link} from 'react-router-dom';
import navItems from '../data/nav-items';
import {
  logo,
  navLink,
  newTag,
  newLink,
  navbarOpen
} from './Navbar.css';

import Avatar from './Avatar';
import {isServer} from '../utils';
import {REVERSIM_SUMMIT} from '../utils';
import { getLoginUrl } from "./Redirect";
import LinkDuo from './LinkDuo';
import {ButtonStyledLink} from './GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../styles/MediaQueriesMixin';

import newImg from '../images/new-nav-tag.png';
import logoImg from '../images/SVG/RS20-04.svg';

// styled-components section
const NavbarContainer = styled.div`
  nav  {
  padding: ${props => props.theme.space.xl};
    ${props => {
      if(props.isColored){
        return (`
          background: ${props.theme.color.background_1};
          transition: background 0.3s;
          `)
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
 ${({theme: { space, } }) =>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: ${space.l};
    padding-left: 0;
    margin-left: auto;
    margin-bottom: 0;
    list-style: none;
  `};

    ${mediaQueryMin.l`
      flex-direction: row;
      padding: 0;
    `}
`;

const NavLI = styled.li`
  ${({ theme: { font, color } }) => `
      width: max-content;
      font-family: ${font.main};
      font-size: ${font.size_md};
      color: ${color.text_1};
      font-weight: ${font.weight_bold};
  `}

      ${mediaQueryMin.l`
      ${({theme: { space } }) => `
        margin-left: ${space.xl};
      `}`}
`;

// React.js componenets section

const GetTicketsCTA = () => {
  useEffect(() => {
    const e = document.createElement('script');
    e.id = 'bz-popup-registration-script-60b24367-c65f-48f8-bbee-9b96dee0e118';
    e.dataset.eventId = '245217';
    e.dataset.flowId = 'ffb476bc-85f0-4ebb-a94a-1c72feb89f37';
    e.dataset.elementClass = 'registration-button';
    e.type = 'text/javascript';
    e.async = !0;
    e.src = 'https://organizer.bizzabo.com/widgets/flows/popup/registrationPopup.js';
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
  }, []);

  return (
    <ButtonStyledLink className="registration-button" href="#">
      Get Tickets
    </ButtonStyledLink>
  );
};

const NavbarItem = ({to, text, external, pathname}) => {
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  const isNew = false; // to === 'sponsors'

  return (
    <NavLI key={to}>
      <LinkDuo
        className={cn(navLinkClass, isNew? newLink: '')}
        to={external ? to : `/${to}`}
        external={external ? 'true' : undefined}>
        {isNew && <img className={newTag} src={newImg}/>}
        {text}
      </LinkDuo>
    </NavLI>
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
      user,
      onLogout,
      pathname,
      history,
      eventConfig,
    } = this.props;
    const {fixed, currentPage: _currentPage} = this.state;
    const items = navItems(eventConfig);
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
                  { eventConfig.registrationOpen &&
                    <NavLI>
                      <GetTicketsCTA /> 
                    </NavLI>
                  }
                  {eventConfig.cfp && (
                    <NavbarItem 
                      text="Submit session" 
                      to="cfp"
                    />
                  )}
                  {eventConfig.voting && pathname !== '/my-votes' && (
                    <NavbarItem 
                      text="Vote for sessions" 
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
                  {eventConfig.voting && (
                    <NavbarItem
                      key={`navbar-i-proposals`}
                      pathname={pathname}
                      {...{to: 'proposals', text: 'Proposals'}}
                    />
                  )}
                  {!user && (
                    <NavbarItem
                      to={getLoginUrl()}
                      text="Login"
                      external={true}
                    />
                  )}
                  {!isServer && user && (
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

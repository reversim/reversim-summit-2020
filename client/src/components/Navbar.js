/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Container as ReactstrapContainer,
  Navbar as ReactstrapNavbar,
  Collapse,
  NavbarToggler,
  Nav
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
import {ButtonStyledLink} from './GlobalStyledComponents/ReversimStyledComps';

// styled-components section
const NavbarContainer = styled.div`
  nav  {
  padding: ${props => props.theme.space. xl};
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

const NavLI = styled.li`
  ${props => {
    const {
      font,
      color,
      mq,
      space,
    } = props.theme;

    return (`
      width: max-content;
      font-family: ${font.main};
      font-size: ${font.size_md};
      color: ${color.text_1};
      font-weight: ${font.weight_bold};
        @media (min-width: ${mq.l}){
          margin-left: ${space.xl};
        }
    `)
  }}  
`;

const NavItemAligner = styled.div`
 ${props => {
  const {
    space,
    mq,
  } = props.theme;

   return (`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: ${space.l};
    padding-left: 0;
    margin-left: auto;
    margin-bottom: 0;
    list-style: none;
    @media (min-width: ${mq.l}){
      flex-direction: row;
      padding: 0;
    };
   `);
 }};

`;

// React.js componenets section

const GetTicketsCTA = () => (
    <ButtonStyledLink
    href="https://ti.to/reversim-summit/2019">
      Get Tickets
    </ButtonStyledLink>
  
);

const NavbarItem = ({to, text, external, pathname}) => {
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  const isNew = to === 'sponsors'
  return (
    <NavLI key={to}>
      <LinkDuo className={cn(navLinkClass, isNew? newLink: '')} to={to} external={!!external}>
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
                    <NavLI> <GetTicketsCTA /> </NavLI>
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

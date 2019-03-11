import React, {Component} from 'react';
import {Container, Navbar as Navbar2, Collapse, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import {navbar, logo, navLink, navItem, isWhite, isNotHome, submitBtn, newTag, newLink} from './Navbar.css';
import logoImg from '../images/SVG/nav-logo.svg';
import Avatar from './Avatar';
import {isServer} from '../utils';
import {REVERSIM_SUMMIT} from '../utils';
import { getLoginUrl } from "./Redirect";
import newImg from '../images/new-nav-tag.png';


const CFPCTA = () => (
  <Link to="/cfp" className="unstyled-link">
    <Button color="primary" className={cn("mr-4", submitBtn)}>
      Submit session
    </Button>
  </Link>
);

const VotingCTA = () => (
  <Link to="/proposals" className="unstyled-link">
    <Button className="styled-button on-purple w-max-content">
      VOTE FOR SESSIONS
    </Button>
  </Link>
);

const NavbarItem = ({to, text, external, pathname}) => {
  let link;
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  const isNew = to === 'sponsors'
  if (external) {
    link = (
      <a className={cn(navLinkClass, isNew? newLink: '')} href={to}>
        {isNew && <img className={newTag} src={newImg}/>}
        {text}
      </a>
    );
  } else {
    link = (
      <Link className={cn(navLinkClass, isNew? newLink: '')} to={`/${to}`}>
        {isNew && <img className={newTag} src={newImg}/>}
        {text}
      </Link>
    );
  }
  return (
    <NavItem key={to} className="text-white ml-lg-5 font-weight-bold font-size-md">
      {link}
    </NavItem>
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

  onScroll = _e => {
    const fixed = window.scrollY > 60;
    this.setState({fixed});
  };

  render() {
    const {isHome, isSmallScreen, user, onLogout, pathname, history, eventConfig} = this.props;
    const {cfp, voting} = eventConfig;
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

    const navLinkClass = cn('nav-link', navLink);

    return (

      <Navbar2
        expand="lg"
        fixed="top"
        className={cn(navbar, {[isNotHome]: !isHome, [isWhite]: isColored})}>
        <Container>
          <div className="d-flex justify-content-between w-100">
              {navbarBrand}
          {/*{cfp && isSmallScreen && pathname !== '/cfp' && <CFPCTA />}*/}
          <NavbarToggler onClick={this.toggle} className="ml-auto" />
                  </div>
          <Collapse isOpen={this.state.isOpen} navbar>

          <Nav
          navbar
          className={cn('ml-auto align-items-end p-3 p-lg-0', {'bg-darkblue': isSmallScreen})}>
            {voting && !isSmallScreen && pathname !== '/proposals' && <li><VotingCTA /></li>}
          {/*<a*/}
          {/*href="https://www.eventbrite.com/e/reversim-summit-2018-tickets-48220530906"*/}
          {/*target="_blank"*/}
          {/*rel="noreferrer noopener"*/}
          {/*className="d-none d-lg-block">*/}
          {/*<Button size="lg" className="text-capitalize font-size-lg-md">*/}
          {/*Get Tickets*/}
          {/*</Button>*/}
          {/*</a>*/}
          {cfp && isSmallScreen && pathname !== '/cfp' && <NavbarItem text="Submit session" to="cfp"/>}
          {voting && isSmallScreen && pathname !== '/my-votes' && <NavbarItem text="VOTE FOR SESSION" to="proposals"/>}
          {items.map(item => (
              <NavbarItem key={`navbar-i-${item.to}`} pathname={pathname} {...item} />
          ))}
          {isSmallScreen &&
          user && (
          <div className="border-top">
              <NavbarItem to="profile" text="My profile" />
              <NavItem className={navItem} onClick={onLogout}>
              <span className={navLinkClass}>Logout</span>
              </NavItem>
              </div>
          )}
          { !user &&
                (<NavbarItem to={getLoginUrl()} text="Login" external={true}/>)}
          { !isServer &&
            !isSmallScreen &&
            user &&
                <li><div className="ml-5">{<Avatar {...user} onLogout={onLogout} />}</div></li>}
          </Nav>

          </Collapse>

          </Container>
      </Navbar2>
    );
  }
}


export default Navbar;

import React, {Component} from 'react';
import {Navbar as Navbar2, Collapse, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import {navbar, logo, navLink, navItem, isWhite, isNotHome} from './Navbar.css';
import logoImg from '../images/rs19-logo.png';
import Avatar from './Avatar';
import {isServer} from '../utils';
import {REVERSIM_SUMMIT} from '../utils';

const CFPCTA = () => (
  <Link to="/cfp" className="unstyled-link">
    <Button color="primary" className="mr-4">
      Submit session
    </Button>
  </Link>
);

const NavbarItem = ({to, text, external, pathname}) => {
  let link;
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  if (external) {
    link = (
      <a className={navLinkClass} href={to}>
        {text}
      </a>
    );
  } else {
    link = (
      <Link className={navLinkClass} to={`/${to}`}>
        {text}
      </Link>
    );
  }
  return (
    <NavItem key={to} className="text-white ml-lg-5 font-weight-heavy font-size-md">
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
    const {cfp} = eventConfig;
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
        <div className="d-flex justify-content-between w-100">
          {navbarBrand}
          {cfp && isSmallScreen && pathname !== '/cfp' && <CFPCTA />}
          <NavbarToggler onClick={this.toggle} className="ml-auto" />
        </div>
        {cfp && !isSmallScreen && pathname !== '/cfp' && <CFPCTA />}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav
            navbar
            className={cn('ml-auto align-items-end p-3 p-lg-0', {'bg-darkblue': isSmallScreen})}>
            {/*<a*/}
              {/*href="https://www.eventbrite.com/e/reversim-summit-2018-tickets-48220530906"*/}
              {/*target="_blank"*/}
              {/*rel="noreferrer noopener"*/}
              {/*className="d-none d-lg-block">*/}
              {/*<Button size="lg" className="text-capitalize font-size-lg-md">*/}
                {/*Get Tickets*/}
              {/*</Button>*/}
            {/*</a>*/}
            {items.map(item => (
              <NavbarItem key={`navbar-i-${item.to}`} pathname={pathname} {...item} />
            ))}
            {isSmallScreen &&
              user && (
                <div className="border-top">
                  <NavbarItem to="profile" text="My profile" />
                  <NavbarItem to="my-votes" text="My votes" />
                  <NavItem className={navItem} onClick={onLogout}>
                    <span className={navLinkClass}>Logout</span>
                  </NavItem>
                </div>
              )}
          </Nav>
        </Collapse>

        {!isServer &&
          !isSmallScreen &&
          user && <div className="ml-5">{<Avatar {...user} onLogout={onLogout} />}</div>}
      </Navbar2>
    );
  }
}

export default Navbar;

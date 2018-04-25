import React, { Component } from 'react';
import {Navbar as Navbar2, Collapse, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import s from './Navbar.css';
import logoImg from '../images/reversim_logo@2x.png';
import Avatar from "./Avatar";
import { isServer } from '../utils';
import { REVERSIM_SUMMIT } from '../utils';
import { getLoginUrl } from './Redirect';
import { cfp } from '../features';

const CFPCTA = () => (
  <Link to="/cfp" className="unstyled-link">
    <Button color="primary" className="mr-4">Submit session</Button>
  </Link>
);

const navLinkClass = cn("nav-link", s.navLink);

const NavbarItem = ({ to, text, external }) => {
  let link;
  if (external) {
    link = <a className={navLinkClass} href={to}>{text}</a>
  } else {
    link = <Link className={navLinkClass} to={`/${to}`}>{text}</Link>;
  }
  return (
    <NavItem key={to} className={s.navItem}>
      {link}
    </NavItem>
  )
};

class Navbar extends Component {
  state = {
    isOpen: false,
    fixed: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentWillMount() {
    if (window.scrollY > 60) {
      this.setState({ fixed: true });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = (e) => {
    const fixed = window.scrollY > 60;
    this.setState({ fixed });
  };

  render() {
    const { isHome, isSmallScreen, user, onLogout, pathname, history } = this.props;
    const { fixed } = this.state;
    const items = navItems(isHome);
    const isWhite = !isHome || fixed;

    const logo = <img className={s.logo} src={logoImg} onClick={() => history.push("/")} alt={REVERSIM_SUMMIT}/>

    const navbarBrand = isHome ?
      <a href='/'>{logo}</a> :
      <Link className="navbar-brand mr-5" to="/">{logo}</Link>

    return (
      <Navbar2 expand="sm" fixed="top" className={cn(s.navbar, { [s.isNotHome]: !isHome, [s.isWhite]: isWhite })}>
        {navbarBrand}
        <div className="d-flex justify-content-between">
          { cfp && isSmallScreen && pathname !== '/cfp' && <CFPCTA /> }
          <NavbarToggler onClick={this.toggle}/>
        </div>
        <Collapse isOpen={this.state.isOpen} navbar className={cn({"bg-white border-bottom": isSmallScreen && !isWhite})}>
          <Nav navbar>
            { items.map(NavbarItem) }
            { isSmallScreen && user && <div className="border-top">
              <NavbarItem to="profile" text="My profile" />
              <NavItem className={s.navItem} onClick={onLogout}><span className={navLinkClass}>Logout</span></NavItem>
            </div>}
            { isSmallScreen && !user && <div className="border-top">
              <NavbarItem to={getLoginUrl()} text="Login" external={true} />
            </div>}
          </Nav>
        </Collapse>
        { cfp && !isSmallScreen && pathname !== '/cfp' && <CFPCTA /> }

        { !isServer && !isSmallScreen && <div className="ml-auto">
          { user ?
            <Avatar {...user} onLogout={onLogout}/>
            : <a href={getLoginUrl()}>
              <Button outline color="primary" onClick={this.login}>Login</Button>
            </a> }
        </div> }

      </Navbar2>
    );
  }

}

export default Navbar;
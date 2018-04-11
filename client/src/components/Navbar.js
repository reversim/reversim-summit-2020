import React, { Component } from 'react';
import {Navbar as Navbar2, Collapse, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import s from './Navbar.css';
import logoImg from '../images/reversim_logo@2x.png';
import Avatar from "./Avatar";
import { isServer, navigateTo } from '../utils';
import { REVERSIM_SUMMIT } from '../utils';

const navLinkClass = cn("nav-link", s.navLink);

const onNavItemClick = (name) => () => navigateTo(name);

const NavbarItem = ({ to, text, external }) => {
  let link;
  if (external) {
    link = <a className={navLinkClass} href={`/${to}`}>{text}</a>
  } else {
    link = <Link className={navLinkClass} to={`/${to}`} onClick={onNavItemClick(to)}>{text}</Link>;
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
    const { isHome, isSmallScreen, user, onLogout, pathname } = this.props;
    const { fixed } = this.state;
    const items = navItems(isHome);

    const logo = <img className={s.logo} src={logoImg} onClick={onNavItemClick("/")} alt={REVERSIM_SUMMIT}/>

    const navbarBrand = isHome ?
      <a href='/'>{logo}</a> :
      <Link className="navbar-brand mr-5" to="/">{logo}</Link>

    return (
      <Navbar2 expand fixed="top" className={cn({ [s.isNotHome]: !isHome, [s.isWhite]: !isHome || fixed })}>
        <NavbarToggler onClick={this.toggle}/>
        {navbarBrand}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            { items.map(NavbarItem) }
          </Nav>
        </Collapse>
        { pathname !== '/cfp' && <Button color="primary" className="mr-4">
          <Link to="/cfp" className="unstyled-link">Submit your session</Link>
        </Button> }

				{ !isServer && !isSmallScreen && <div className="ml-auto">
					{ user ?
            <Avatar {...user} onLogout={onLogout}/>
						: <a href="/auth/google">
              <Button outline color="secondary" onClick={this.login}>Login</Button>
            </a> }
        </div> }
      </Navbar2>
    );
  }

}

export default Navbar;
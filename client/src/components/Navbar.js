import React, { Component } from 'react';
import { Navbar as Navbar2, Collapse, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import navItems from '../data/nav-items';
import cn from 'classnames';
import s from './Navbar.css';
import createHistory from 'history/createBrowserHistory'
import logoImg from '../images/reversim_logo@2x.png';

const history = createHistory();

const navLinkClass = cn("nav-link", s.navLink);

const onNavItemClick = (name) => () => history.push(name);

const NavbarItem = ({ to, text, noScroll, external }) => {
  let link;
  if (external) {
    link = <a className={navLinkClass} href={`/${to}`}>{text}</a>
  } else if (noScroll) {
    link = <Link className={navLinkClass} to={`/${to}`} onClick={onNavItemClick(to)}>{text}</Link>;
  } else {
    link = <ScrollLink className={navLinkClass} activeClass='active' to={to} spy={true} smooth={true} offset={-50} duration={500} onClick={onNavItemClick(to)}>{text}</ScrollLink>
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
    const { isHome } = this.props;
    const { fixed } = this.state;
    const items = navItems(isHome);

    const logo = <img className={s.logo} src={logoImg} onClick={onNavItemClick("/")} alt="Reversim Summit 2017"/>

    const navbarBrand = isHome ?
      <ScrollLink className='navbar-brand mr-5' activeClass='active' to="hero" spy={true} smooth={true} offset={-50} duration={500}>{logo}</ScrollLink> :
      <Link className="navbar-brand mr-5" to="/">{logo}</Link>

    return (
      <Navbar2 toggleable fixed="top" className={cn({ [s.isNotHome]: !isHome, [s.isWhite]: !isHome || fixed })}>
        <NavbarToggler right onClick={this.toggle}/>
        {navbarBrand}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            { items.map(NavbarItem) }
          </Nav>
        </Collapse>
      </Navbar2>
    );
  }

}

export default Navbar;
/* global $ */
import React from 'react';
import cn from 'classnames';
import { Link as ScrollLink } from 'react-scroll';


export default class Navbar extends React.Component {

  closeMenu = this.closeMenu.bind(this);

  closeMenu() {
    $("#navbarSupportedContent").collapse("hide");
  }

  renderNavLink = this.renderNavLink.bind(this);

  renderNavLink({ name, href, isActive }, i) {
    let link;
    if (this.isHome()) {
      link = <ScrollLink to={href} smooth={true} duration={300} offset={this.props.isSmallScreen ? -100 : 0} className="nav-link" onClick={this.closeMenu}>{name}{isActive? <span className="sr-only">(current)</span>:undefined}</ScrollLink>
    } else {
      link = <a className="nav-link" href={href} onClick={this.closeMenu}>{name}{isActive? <span className="sr-only">(current)</span>:undefined}</a>
    }

    return <li key={i} className={cn('nav-item', { active: isActive })}>{link}</li>
  }

  isHome() {
    return this.props.location.pathname === '/';
  }

  render() {
    const { items, logo } = this.props;
    const logoImg = <img src={logo} alt="logo" className="img-fluid"/>;
    const logoLink = this.isHome() ? <ScrollLink to="hero" smooth={true} duration={300} className="navbar-brand">{logoImg}</ScrollLink> : <a className="navbar-brand" href="/">{logoImg}</a>;
    return (
      <nav className="navbar navbar-inverse bg-primary navbar-toggleable fixed-top">
        <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {logoLink}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {items.map(this.renderNavLink)}
          </ul>
        </div>
      </nav>
    );
  }
}
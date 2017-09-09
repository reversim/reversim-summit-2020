import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './Hero.css';


class Hero extends Component {

  render() {
    // const {} = this.props;
    return (
      <section className={cn(s.hero, "d-flex", "align-items-center", "justify-content-center", "font-pt")}>
        <div>
          <h1 className={cn("font-weight-bold", "mb-4", s.title)}>Reversim Summit 2017</h1>
          <div className={cn(s.autoCenter, "h4", "d-inline-block", "mb-4")}>
            <div><i className="fa fa-calendar-o text-primary mr-3 mb-3"/><span>15 - 16 . Oct</span></div>
            <div><i className="fa fa-map-marker text-primary mr-3 ml-1"/><span>College of Management</span></div>
          </div>
          <div className="mb-3">
            <div className={cn(s.cta, "p-4", s.autoCenter, "d-inline-block", "text-center")}>
              <div className="text-uppercase"><Link to="/agenda">Agenda</Link> is published!</div>
              <div><Link className="font-raleway" to="/register">Register here!</Link></div>
            </div>
          </div>
          <div className="text-center">
            <a href="https://twitter.com/reversim" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"/></a>
            <a href="https://www.facebook.com/groups/806177629478248/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"/></a>
          </div>
        </div>
      </section>
    );
  }

}

export default Hero;
import React, {Component} from 'react';
import cn from 'classnames';
import s from './Hero.css';
import Messages from './Messages';
import {Container} from "reactstrap";


class Hero extends Component {

  render() {
    const { messages } = this.props;
    return (
      <section className={cn(s.hero, "d-flex", "align-items-center", "justify-content-lg-center", "flex-column", "font-pt")}>
        <div>
          <h1 className={cn("font-weight-bold", "mb-4", "text-center", s.title)}>Reversim Summit 2017</h1>
          <div className={cn(s.autoCenter, "h4", "d-inline-block", "mb-4")}>
            <div><i className="fa fa-calendar-o text-primary mr-3 mb-3"/><span>15 - 16 . Oct</span></div>
            <div><i className="fa fa-map-marker text-primary mr-3 ml-1"/><span>College of Management</span></div>
          </div>
          <div className="mb-3">
            <div className={cn(s.cta, "p-5", s.autoCenter, "d-inline-block", "text-center")}>
              <h3 className="text-uppercase mb-0">It was awesome seeing you, thanks everyone!</h3>
            </div>
          </div>
          <div className="text-center">
            <a className="text-white font-size-lg mr-4" href="https://twitter.com/reversim" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"/></a>
            <a className="text-white font-size-lg" href="https://www.facebook.com/groups/806177629478248/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"/></a>
          </div>
        </div>
        <Container>
          <Messages messages={messages} />
        </Container>
      </section>
    );
  }

}

export default Hero;
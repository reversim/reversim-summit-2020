import React, { Component, Fragment } from 'react';
import cn from 'classnames';
import s from './Hero.css';
import Messages from './Messages';
import { Button, Container } from 'reactstrap';
import { REVERSIM_SUMMIT } from '../utils';
import { Link } from 'react-router-dom';

class Hero extends Component {

  static defaultProps = {
    eventConfig: {},
  }

  render() {
    const { messages, eventConfig } = this.props;
    const { cfp, voting, votingEnded } = eventConfig;
    return (
      <section className={s.hero}>
        <div className={cn(s.heroInner, 'ml-auto font-amstelvar text-center')}>
          <h1 className={cn("font-weight-bold mb-4 text-center", s.title)}>{REVERSIM_SUMMIT}</h1>
          <div className={cn("h4 d-inline-block mb-8 text-left")}>
            <div><i className="fa fa-calendar-o mr-3 mb-3" /><span>8 - 9 . Oct</span></div>
            <div><i className="fa fa-map-marker mr-3 ml-1" /><span>Tel Aviv University</span></div>
          </div>
          <div className="mb-8">
            <div className={cn(s.cta, "p-5 d-inline-block mx-6 font-raleway")}>
              {cfp && <Fragment>
                <h3 className="text-uppercase">We're back</h3>
                <h4 className="mb-0 font-weight-normal">CFP is open!</h4>
                <Link to="/cfp" className="unstyled-link mt-4 d-block">
                  <Button color="primary" size="lg">Submit session</Button>
                </Link>
              </Fragment>}
              {voting &&
                <Fragment>
                  <h4 className="mb-0 font-weight-normal">Voting is open!</h4>
                  <Link to="/proposals" className="unstyled-link mt-4 d-block">
                    <Button color="primary" size="lg">Vote Now</Button>
                  </Link>
                </Fragment>}
              {votingEnded &&
                <Fragment>
                  <h4 className="mb-0 font-weight-normal">Voting has ended, thank you!</h4>
                  <h4 className="mb-0 font-weight-normal">Please stay tuned for when we publish the schedule and open registration</h4>
                </Fragment>}
            </div>
          </div>
          <div className="text-center">
            <a className="text-white font-size-lg mr-4" href="https://twitter.com/reversim" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a>
            <a className="text-white font-size-lg mr-4" href="https://www.facebook.com/groups/806177629478248/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a>
            <a className="text-white font-size-lg" href="https://groups.google.com/forum/#!forum/reversim-summit" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" /></a>
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
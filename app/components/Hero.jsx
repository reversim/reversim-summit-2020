import React from 'react';
import { Link } from 'react-router';
import { Link as ScrollLink } from 'react-scroll';
import { getRemainingCFPDays } from 'utils';
import Rodal from 'components/Rodal';
import features from 'features';
import classNames from 'classnames/bind';
import ga from 'react-ga';

import styles from 'css/main';
const cx = classNames.bind(styles);


export default class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistrationModalOpen: false
    }
  }

  startRegistrationModal(event) {
    event.preventDefault();

    ga.modalview('registration');

    this.setState({ isRegistrationModalOpen: true });
  }

  closeRegistrationModal(event) {
    event.preventDefault();

    this.setState({ isRegistrationModalOpen: false });
  }

  getLeftButton() {
    if (features('viewSlides', false)) {
      return <a href="#" className={cx('btn')}>VIDEOS (SOON)</a>;
    } else if (features('startRegistration', false)) {
      return <a href="#" onClick={this.startRegistrationModal.bind(this)} className={cx('btn')}>GET TICKETS</a>;
    } else if (features('publishAgenda', false)) {
      return <ScrollLink to='register' className={cx('btn')} spy={true} smooth={true} offset={-80} duration={500}>REGISTER</ScrollLink>;;
    } else if (features('submission', false)) {
      return <Link to="submit" className={cx('btn')}>SUBMIT PROPOSAL</Link>;
    } else if (!features('startRegistration', false)) {

    } else {
      return <Link to="proposals" className={cx('btn')}>VIEW PROPOSALS</Link>;
    }
  }

  getRightButton() {
    if (features('viewSlides', false)) {
      return <Link to="schedule" className={cx('btn', 'btn-outline')}>SLIDES</Link>;
    } else if (!features('startRegistration', false)) {

    } else {
      return <ScrollLink to={ features('publishAgenda', false) ? 'schedule' : 'timeline' } className={cx('btn', 'btn-outline')} spy={true} smooth={true} offset={-50} duration={500}>VIEW SCHEDULE</ScrollLink>;
    }
  }

  getButtonsMsg() {
    if (features('viewSlides', false)) {
      return <span>The summit is over.<br/>Thanks to all the participants!<br/>See you in Reversim Summit 2018 !</span>
    } else if (features('preCFP')) {
      return <div>Coming Soon !<a href="https://groups.google.com/forum/#!forum/reversim-summit/join" style={{marginTop: 14, display: "block", fontSize: "1rem", textDecoration: "underline"}}>Join the list to get updates</a></div>;
    } else if (features('startRegistration')) {
      return 'Tickets for Reversim Summit 2017 are available !'
    } else if (features('publishAgenda')) {
      return 'Agenda was Published !';
    } else {
      const remaining = getRemainingCFPDays();
      const isOpen = features('submission', false),
        status = isOpen ? 'open !' : 'closed';
      return (
        <div>
          Call for papers is now {status}{ isOpen && <small style={{textTransform:'none', color: 'white'}}><br/>
          { remaining > 0 ? <span><span className={cx("days-remaining")}>{remaining}</span> days remaining, s</span> : 'Today is the last day! S' }ee <ScrollLink to="timeline" smooth={true} offset={-50} style={{cursor:'pointer'}}>timeline</ScrollLink> here</small>}
        </div>
      );
    }
  }

  // before 11/6: Coming Soon !                   (preCFP === true)
  // 11/6 - 20/7: Call for papers is now open !   (preCFP === false, submission === true)
  // 20/7 - 20/8: Call for papers is now closed   (submission === false)
  // 20/8 - 20/9: Agenda was published !          (publishAgenda === true)
  // 20/9 - 30/10: Tickets for Reversim Summit 2017 are available !   (startRegistration === true)

  render() {
    const leftButton = this.getLeftButton(),
      rightButton = this.getRightButton(),
      buttonsMsg = this.getButtonsMsg();

    return (
      <section id="hero" className={cx('hero-section', 'bg1', 'bg-cover', 'window-height', 'light-text')}>
        <ul className={cx("socials-nav")}>
          <li className={cx('socials-nav-item')}><a href="https://twitter.com/reversim"><span className={cx('fa', 'fa-twitter')}></span></a></li>
          <li className={cx('socials-nav-item')}><a href="https://www.facebook.com/groups/806177629478248/"><span className={cx('fa', 'fa-facebook')}></span></a></li>
        </ul>
        <div className={cx('heading-block', 'centered-block', 'align-center')}>
          <div className={cx('container')}>
            <h5 className={cx('heading-alt')} style={ {marginBottom: '8px'} }>
              <span className={cx('small-block')}><i className={cx('fa', 'fa-calendar-o', 'base-clr-txt')}/>15-16.Oct </span>
              <span className={cx('small-block')}><i className={cx('fa', 'fa-map-marker', 'base-clr-txt')} style={ {marginLeft: '14px'} }/>College of Management</span>
            </h5>
            <h1 className={cx('extra-heading')}>Reversim Summit 2017</h1>
            <h5 className={cx('base-font', 'buttons-msg')}>
              {buttonsMsg}
            </h5>
            <div className={cx('btns-container')}>
              {leftButton} {rightButton}
            </div>
          </div>
        </div>
        { features('startRegistration', false) ?
        <Rodal  visible={this.state.isRegistrationModalOpen}
                width={700}
                height={400}
                onClose={this.closeRegistrationModal.bind(this)}>
          <div style={ {width: '100%', height: '100%', textAlign: 'left'} }>
            <iframe src="//eventbrite.com/tickets-external?eid=26992112134&ref=etckt" frameBorder="0" style={{width:"100%", height:"100%", border:"none"}}></iframe>
          </div>
        </Rodal> : undefined }
      </section>
    );
  }
}
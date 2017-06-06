import React from 'react';
import { Link } from 'react-router';
import features from 'features';
import classNames from 'classnames/bind';

import styles from 'css/main';
const cx = classNames.bind(styles);

function getRightButton() {
  if (features('viewSlides', false)) {
    return <Link to="schedule" className={cx('btn', 'btn-outline')}>SLIDES</Link>;
  } else if (!features('startRegistration', false)) {

  } else {
    return <ScrollLink to={ features('publishAgenda', false) ? 'schedule' : 'timeline' } className={cx('btn', 'btn-outline')} spy={true} smooth={true} offset={-50} duration={500}>VIEW SCHEDULE</ScrollLink>;
  }
}

function getLeftButton() {
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

function getButtonsMsg() {
  if (features('viewSlides', false)) {
    return <span>The summit is over.<br/>Thanks to all the participants!<br/>See you in Reversim Summit 2018!</span>
  } else if (features('startRegistration', false)) {
    return 'Tickets for Reversim Summit 2017 are available!'
  } else if (features('publishAgenda', false)) {
    return 'Agenda was Published!';
  } else if (!features('startRegistration', false)) {
    return <span>Coming soon !</span>;
  } else {
    return 'Call for papers is now ' + (features('submission', false) ? 'open!' : 'closed')
  }
}

export default (props) => {
  const leftButton = getLeftButton(),
      rightButton = getRightButton(),
      buttonsMsg = getButtonsMsg();

  return (
    <section id="hero" className={cx('hero-section', 'bg1', 'bg-cover', 'window-height', 'light-text')}>
      <ul className={cx("socials-nav")}>
       <li className={cx('socials-nav-item')}><a href="https://twitter.com/reversim"><span className={cx('fa', 'fa-twitter')}></span></a></li>
       <li className={cx('socials-nav-item')}><a href="https://www.facebook.com/groups/806177629478248/"><span className={cx('fa', 'fa-facebook')}></span></a></li>
      </ul>
      <div className={cx('heading-block', 'centered-block', 'align-center')}>
        <div className={cx('container')}>
          <h5 className={cx('heading-alt')} style={ {marginBottom: '8px'} }>
            <span class={cx('small-block')}><i className={cx('fa', 'fa-calendar-o', 'base-clr-txt')}/>15-16.Oct </span>
            <span class={cx('small-block')}><i className={cx('fa', 'fa-map-marker', 'base-clr-txt')} style={ {marginLeft: '14px'} }/>College of Management</span>
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
    </section>
  );
}
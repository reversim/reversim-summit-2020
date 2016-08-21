import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import features from 'features';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Register = () => {
  let registrationText, registrationHeader;
  if (features('startRegistration', false)) {
    registrationHeader = <h2>Get a Ticket for Reversim Summit 2016</h2>;

    registrationText =
      <div>
        <p>Tickets for Reversim Summit 2016 are available!</p>
        <p>Join Reversim Summit Google group and stay tuned!</p>
      </div>;

  } else {
    registrationHeader = <h2>Register to Reversim Summit 2016</h2>;

    registrationText =
      <div>
        <p>Registration will be opened on mid August.</p>
        <p>Join Reversim Summit Google group and stay tuned!</p>
      </div>;
  }

  return (
    <section id="register" className={cx('section', 'overlay', 'overlay-clr', 'bg-cover', 'bg2', 'light-text', 'align-center')}>
      <div className={cx("container")}>
        {registrationHeader}
        {registrationText}
        <br />
        <br />
        <a href={features('startRegistration', false) ? 'https://www.eventbrite.com/e/reversim-summit-2016-tickets-26992112134' : 'https://groups.google.com/forum/#!forum/reversim-summit/join'} className={cx('btn', 'btn-sm', 'btn-outline')}>{ features('startRegistration', false) ? 'Get a Ticket' : 'Join' }</a>
      </div>
    </section>
  );
};

export default Register;

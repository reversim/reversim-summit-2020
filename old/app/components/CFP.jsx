import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const CFP = () => {
  return (
    <section id="register" className={cx('section', 'overlay', 'overlay-clr', 'bg-cover', 'bg4', 'light-text', 'align-center')}>
      <div className={cx("container")}>
        <h2>Submit a session now!</h2>
      <p>Reversim Summit is a community event and as such, we are looking for speakers of all levels and experience. <br />
    We’re especially looking for new speakers, we love to learn new things from people we’ve never met. <br />Join us, tell us a good story.</p>
        <br />
        <br />

        <Link to="submit" className={cx('btn', 'btn-lg', 'btn-outline')}>Submit</Link>
      </div>
    </section>
  );
};

export default CFP;

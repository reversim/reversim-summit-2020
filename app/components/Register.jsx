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
const Register = () => {
  return (
    <section id="register" className={cx('section', 'overlay', 'overlay-clr', 'bg-cover', 'bg2', 'light-text', 'align-center')}>
      <div className={cx("container")}>
        <h2>Register to Reversim Summit 2016</h2>
        <p>Registration will be opened on mid August.</p>
        <p>Join Reversim Summit Google group and stay tuned!</p>
        <br />
        <br />

        <a href="https://groups.google.com/forum/#!forum/reversim-summit/join" className={cx('btn', 'btn-sm', 'btn-outline')}>Join</a>
      </div>
    </section>
  );
};

export default Register;

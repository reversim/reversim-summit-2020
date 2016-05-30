import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

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
        <h2>Submit a lecture now!</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br /> industry. took a galley of type and scrambled it to make a type.</p>
        <br />
        <br />

        <a href="#" className={cx('btn', 'btn-lg', 'btn-outline')}>Submit</a>
      </div>
    </section>
  );
};

export default CFP;

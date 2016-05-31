import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

import sponsor1Logo from 'images/sponsors/sponsor-big-1.png';
import sponsor2Logo from 'images/sponsors/sponsor-big-2.png';
import sponsor3Logo from 'images/sponsors/sponsor-big-3.png';
import sponsor4Logo from 'images/sponsors/sponsor-big-4.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Sponsors = () => {
  return (
    <section id="sponsors" className={cx('section', 'align-center')}>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-documents-bookmarks-12')}></span>
      <h3>Sponsors</h3>
        <p className={cx("text-alt")}>companies that <span className={cx("highlight")}>support</span> us</p>
        <br/>
        <br/>

        <div className={cx("sponsors")}>
          <div className={cx('sponsor', 'big')}><img src={sponsor1Logo} alt="" /></div>
          <div className={cx('sponsor', 'big')}><img src={sponsor2Logo} alt="" /></div>
          <div className={cx('sponsor', 'big')}><img src={sponsor3Logo} alt="" /></div>
          <div className={cx('sponsor', 'big')}><img src={sponsor4Logo} alt="" /></div>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;

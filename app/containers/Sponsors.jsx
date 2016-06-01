import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

import outbrainLogo from 'images/sponsors/outbrain.png';
import wixLogo from 'images/sponsors/wix.png';

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
          <a href="http://www.outbrain.com/"><div className={cx('sponsor', 'big')}><img src={outbrainLogo} alt="Outbrain" /></div></a>
          <a href="http://www.wix.com/"><div className={cx('sponsor', 'big')}><img src={wixLogo} alt="Wix" /></div></a>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;

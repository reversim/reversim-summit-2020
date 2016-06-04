import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/main';
import reversimLogoFooter from 'images/reversim_logo_footer.png';

const cx = classNames.bind(styles);

const Footer = ({children}) => {
  return (
    <section className={cx("footer")}>
      <div className={cx("container")}>

        <div className={cx("col-md-4")}>
          <div className={cx('widget', 'about-widget')}>
            <h6 className={cx("widget-head")}>About <span className={cx("highlight")}>Reversim</span></h6>
          <p className={cx("text-alt")}><small><a href="http://reversim.com/">Reversim</a> (רברס עם פלטפורמה) is a Hebrew podcast by <a href="https://twitter.com/orilahav">Ori Lahav</a> and <a href="http://tavory.com/">Ran Tavory</a> which brings together software developers and product, with over 300 recorded episodes and a few thousands listners.</small></p>
            <p className={cx("text-alt")}><small>The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.</small></p>
          <img src={reversimLogoFooter} alt="autograph" />
          </div>
        </div>

        <div className={cx('col-md-4', 'col-lg-3', 'col-lg-offset-1')}>
          <div className={cx('widget', 'twitter-widget')}>
            <h6 className={cx("widget-head")}><span className={cx('fa', 'fa-twitter')}></span> Twitter Feed</h6>

            <ul className={cx("tweets-list")}>
              <li className={cx("tweet")}>
                <p className={cx('text-alt', 'tweet-text')}>New: Visual object detection, including face detection and recognition with Imry Kissos, <a href="#">@rantav</a> <a href="#">@orilahav</a></p>
                <small className={cx("tweet-date")}>27 apr 2016</small>
              </li>

              <li className={cx("tweet")}>
                <p className={cx('text-alt', 'tweet-text')}>New: Visual object detection, including face detection and recognition with Imry Kissos, <a href="#">@rantav</a> <a href="#">@orilahav</a></p>
                <small className={cx("tweet-date")}>27 apr 2016</small>
              </li>

              <li className={cx("tweet")}>
                <p className={cx('text-alt', 'tweet-text')}>New: Visual object detection, including face detection and recognition with Imry Kissos, <a href="#">@rantav</a> <a href="#">@orilahav</a></p>
                <small className={cx("tweet-date")}>27 apr 2016</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={cx("footer-base")}>
        <div className={cx("container")}>

          <div className={cx("col-md-6")}>
            <ul className={cx("footer-nav")}>
              <li className={cx("footer-nav-item")}><a href="mailto:adam@matan.name">Contact</a></li>
              <li className={cx("footer-nav-item")}><a href="http://confcodeofconduct.com/">Code of Conduct</a></li>
            </ul>
          </div>

          <div className={cx('col-md-6', 'align-right')}>
            <ul className={cx('socials-nav', 'align-right')}>
              <li className={cx("socials-nav-item")}><a href="https://twitter.com/reversim"><span className={cx('fa', 'fa-twitter')}></span></a></li>
            <li className={cx("socials-nav-item")}><a href="https://www.facebook.com/groups/806177629478248/"><span className={cx('fa', 'fa-facebook')}></span></a></li>
            </ul>

            <p className={cx("text-alt")}><small>All Rights Reserved © 2016</small></p>
          </div>

        </div>
      </div>
    </section>
  );
};

Footer.propTypes = {
  children: PropTypes.object
};

export default Footer;

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import ga from 'react-ga';

import aboutGeneralInfo from 'images/about-general-info.jpg';
import aboutSponsors from 'images/about-sponsors.jpg';
import aboutTopics from 'images/about-topics.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <section id="messages" className={cx('section', 'align-center')}>
            <div className={cx("container")}>
              <div className={cx("alert", "alert-info", "text-left")} role="info">
                <strong>Feedback Forms</strong>
                <ul>
                  <li><a style={{color: '#000', marginTop: 10, marginBottom: 10}} href="https://docs.google.com/forms/d/e/1FAIpQLSckhLFEer5gN1oVV8_H-B4OyLztBgS_6ApeR4jjMHoomNhdcw/viewform">Day 1 - 19/09/16</a></li>
                  <li><a style={{color: '#000', marginTop: 10, marginBottom: 10}} href="https://docs.google.com/forms/d/e/1FAIpQLSe5VuUQwPoqRxwbivz6CFyJl4dVna4pQ0l0xLhLP4GUHxCsNA/viewform">Day 2 - 20/09/16</a></li>
                </ul>
              </div>
            </div>
          </section>
    );
  }
};

export default About;

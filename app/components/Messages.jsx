import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

import messages from 'data/messages';

const cx = classNames.bind(styles);

export default (props) => {
  return (
    messages ?
      <section id="messages" className={cx('section', 'align-center')}>
        <div className={cx("container")}>
          <div className={cx("alert", "alert-info", "text-left")} role="info">
            <strong>Feedback Forms</strong>
            <ul>
              {messages.map(msg => {
                <li>{msg}</li>
              })}
            </ul>
          </div>
        </div>
      </section>
  : null);
};

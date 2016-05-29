import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About Reversim Summit 2016</h1>
      <div className={cx('description')}>
        <p>Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which brings together software developers and product managers, with over 300 recorded episodes over six years and a few k listeners.<br />
            The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring the content we are interested in, and we hope you will be too.
        </p>
      </div>
    </div>
  );
};

export default About;

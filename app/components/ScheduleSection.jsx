import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Schedule from 'components/Schedule';
import ga from 'react-ga';

const cx = classNames.bind(styles);

class ScheduleSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { acceptedProposals } = this.props;

    return (
      <section id="agenda" className={cx('section', 'align-center')}>
        <div className={cx("container")}>
          <span data-icon className={cx('icon', 'section-icon', 'icon-seo-icons-31')}></span>
          <h3>Schedule</h3>
          <br />
          <br />
          <Schedule acceptedProposals={acceptedProposals} />
        </div>
      </section>
    );
  }
};

export default ScheduleSection;

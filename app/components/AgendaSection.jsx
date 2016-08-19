import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Agenda from 'components/Agenda';
import ga from 'react-ga';

const cx = classNames.bind(styles);

class AgendaSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { acceptedProposals } = this.props;

    return (
      <section id="agenda" className={cx('section', 'align-center')}>
        <div className={cx("container")}>
          <span data-icon className={cx('icon', 'section-icon', 'icon-seo-icons-31')}></span>
          <h3>Agenda</h3>
          <br />
          <br />
          <Agenda acceptedProposals={acceptedProposals} />
        </div>
      </section>
    );
  }
};

export default AgendaSection;

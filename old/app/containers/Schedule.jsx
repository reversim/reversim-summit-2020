import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import { fetchProposals } from 'actions/proposals';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import ScheduleElement from 'components/Schedule';
import ProposalPreview from 'components/ProposalPreview';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png';

const cx = classNames.bind(styles)

class Schedule extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    render() {
        const { acceptedProposals, user, location: { pathname } } = this.props;

        const sessions = acceptedProposals.sort((x, y) => new Date(x.startTime) - new Date(y.startTime)).map((session, i) => {
          let type;
          if (session.type === 'ossil') {
            type = "Open Source in Israel (10 min.)";
          } else if (session.type === 'lightning') {
            type = "Lightning Talk (5 min.)";
          } else {
            type = "Full Featured (30-40 min.)";
          }

          return (
            <ProposalPreview  proposal={session}
                              user={user}
                              key={i}
                              location={pathname} />
          );
        });

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="agenda">
              <section id="agenda" className={cx('section', 'align-center')}>
                <div className={cx("container")}>
                  <h3>Schedule</h3>
                  <br />
                  <br />
                  <ScheduleElement acceptedProposals={acceptedProposals} />
                  {sessions}
                </div>
              </section>
            </BaseLayout>
        );
    }
}

Schedule.propTypes = {
  user: PropTypes.object,
  acceptedProposals: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

Schedule.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user,
        acceptedProposals: state.proposal.accepted
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Schedule);

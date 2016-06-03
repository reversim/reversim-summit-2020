import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import {fetchProposal} from 'actions/proposals';
import Speaker from 'components/Speaker';
import SocialShare from 'components/SocialShare';

import styles from 'css/main';

import defaultSpeakerPic from 'images/team/ori.png'

const cx = classNames.bind(styles)

class Session extends Component {

    constructor(props) {
        super(props);

        const { params: { id } } = props;
        props.dispatch(fetchProposal(id));
    }

    renderSessionInfo() {
      const { currentProposal: { abstract, title, speaker_ids } } = this.props;

      let speakers = speaker_ids.map(speaker => <Speaker name={speaker.profile.name} imageUrl={speaker.profile.picture || defaultSpeakerPic} oneLiner={speaker.profile.oneLiner} bio={speaker.profile.bio} linkedin={speaker.profile.linkedin} twitter={speaker.profile.twitter}></Speaker>)
      const abstractParagraphs = abstract.split('\n').map(paragraph => <p>{paragraph}</p>);

      return (<div>
                <section id="register" className={cx('section', 'overlay', 'bg4', 'light-text', 'align-center')}>
                  <div className={cx("container")}>
                    <h2>{title}</h2>
                  </div>
                </section>

                <section id="session-info" className={cx('section', 'container')}>
                  <div className={cx('col-md-6', 'col-md-offset-1')}>
                    <p>{abstractParagraphs}</p>

                    <SocialShare url={window.location.href} title='google' />
                  </div>

                  <div className={cx('col-md-4', 'col-md-offset-1')}>
                    {speakers}
                  </div>

                </section>
              </div>);
    }

    render() {
        const { isFetching } = this.props;

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="session-page">
                {isFetching ? undefined : this.renderSessionInfo()}
            </BaseLayout>
        );
    }
}

Session.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  currentProposal: PropTypes.object,
  isFetching: PropTypes.bool
};

Session.defaultProps = { isFetching: true };

function mapStateToProps(state) {
    return {
        user: state.user,
        currentProposal: state.proposal.currentProposal,
        isFetching: state.proposal.isFetching
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Session);

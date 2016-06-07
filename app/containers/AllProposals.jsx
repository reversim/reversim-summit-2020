import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import { fetchProposals } from 'actions/proposals';
import ReactMarkdown from 'react-markdown';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles)

class AllProposals extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    render() {
        const proposalsBlocks = this.props.proposals.map((proposal, i) => {
          let type;
          if (proposal.type === 'ossil') {
            type = "Open Source in Israel (10 min.)";
          } else if (proposal.type === 'lightning') {
            type = "Lightning Talk (5 min.)";
          } else {
            type = "Full Featured (30-40 min.)";
          }

          return (
            <section className={cx("section", "container")} style={ {padding: '0 30px 60px'} } key={i}>
              <div className={cx("col-md-8", "col-md-offset-1")}>
                <div className={cx('align-left')}>
                  <article>
                    <h5>{proposal.title}</h5>
                      <p><small className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small></p>
                      <ReactMarkdown source={proposal.abstract} className={cx("markdown-block")} />
                      <Link to={`session/${proposal.id}`} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{ margin: '20px 0 0' }}>View</Link>
                  </article>
                </div>
              </div>
              <div className={cx("col-md-3")}>
              { proposal.speaker_ids.map((speaker, i) => {
                return (<Speaker key={i} name={speaker.name} imageUrl={speaker.picture || defaultSpeakerPic} oneLiner={speaker.oneLiner} linkedin={speaker.linkedin} twitter={speaker.twitter} stackOverflow={speaker.stackOverflow} />);
              })  }
              </div>
            	</section>
          );
        });

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="all-proposals">

              <section id="register" className={cx('section', 'overlay', 'bg-my-proposals', 'light-text', 'align-center')}>
                <div className={cx("container")}>
                  <h1>Reversim Summit 2016 - Proposals</h1>
                </div>
              </section>

              <section id="all-proposals" className={cx('section', 'container')}>
                    {proposalsBlocks}
              </section>

            </BaseLayout>
        );
    }
}

AllProposals.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  proposals: PropTypes.array
};

AllProposals.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: state.proposal.proposals
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AllProposals);

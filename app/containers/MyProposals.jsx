import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import { fetchUserProposals } from 'actions/users';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png';

const cx = classNames.bind(styles)

class MyProposals extends Component {

    static need = [  // eslint-disable-line
        fetchUserProposals
    ];

    constructor(props) {
        super(props);
    }

    render() {
        const { name, picture, oneLiner, bio, linkedin, twitter, stackOverflow, proposals } = this.props.user;

        const proposalsBlocks = proposals.map((proposal, i) => {
          let type;
          if (proposal.type === 'ossil') {
            type = "Open Source in Israel (10 min.)";
          } else if (proposal.type === 'lightning') {
            type = "Lightning Talk (5 min.)";
          } else {
            type = "Full Featured (30-40 min.)";
          }

          return (
            <section className={cx("section")} style={ {padding: '0 30px 60px'} } key={i}>
              <div>
                <div className={cx('align-left')}>
                  <article>
                    <h5>{proposal.title}</h5>
                      <p><small className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small></p>
                      <ReactMarkdown source={proposal.abstract} className={cx("markdown-block")} />
                      <Link to={`/session/${proposal.id}`} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{ margin: '20px 0 0' }}>View</Link>
                  </article>
                </div>
              </div>
            	</section>
          );
        });

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="my-proposals">

              <section id="register" className={cx('section', 'overlay', 'header-bg', 'bg-my-proposals', 'light-text', 'align-center')}>
                <div className={cx("container")}>
                  <h1>My Proposals</h1>
                </div>
              </section>

              <section id="my-proposals" className={cx('section', 'container')}>
                  <div className={cx('col-md-7', 'col-md-offset-1')}>
                    {proposalsBlocks}
                  </div>

                  <div className={cx('col-md-4')}>
                    <Speaker name={name} imageUrl={picture || defaultSpeakerPic} oneLiner={oneLiner} bio={bio} linkedin={linkedin} twitter={twitter} stackOverflow={stackOverflow} />
                  </div>

              </section>

            </BaseLayout>
        );
    }
}

MyProposals.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

MyProposals.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(MyProposals);

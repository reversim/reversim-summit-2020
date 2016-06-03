import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import About from 'components/About';
import Footer from 'components/Footer';
import { StickyContainer, Sticky } from 'react-sticky';
import Scroll, { Element } from 'react-scroll';
import {fetchUserProposals } from 'actions/users';
import Speaker from 'components/Speaker';
import SocialShare from 'components/SocialShare';
import Proposal from 'components/Proposal';
import {Link} from 'react-router';

import styles from 'css/main';

import someSpeaker from 'images/team/ori.png'

const cx = classNames.bind(styles)

class MyProposals extends Component {

    static need = [  // eslint-disable-line
        fetchUserProposals
    ];

    constructor(props) {
        super(props);
    }

    render() {
        const { name, picture, oneLiner, bio, linkedin, twitter, proposals } = this.props.user;

        const proposalsBlocks = proposals.map(proposal => {
          let type;
          if (proposal.type === 'ossil') {
            type = "Open Source in Israel (10 min.)";
          } else if (proposal.type === 'lightning') {
            type = "Lightning Talk (5 min.)";
          } else {
            type = "Full Featured (30-40 min.)";
          }

          return (
            <section className={cx("section")} style={ {padding: '0 30px 60px'} }>
              <div>
                <div className={cx('align-left')}>
                  <article>
                    <h5>{proposal.title}</h5>
                      <p><small className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small></p>
                      <p>{proposal.abstract}</p>
                      <Link to={`session/${proposal.id}`} className={cx('btn', 'btn-outline-clr')} style={{ margin: '20px 0 0' }}>View</Link>
                  </article>
                </div>
              </div>
            	</section>
          );
        })

        return (
            <StickyContainer>
              <div className={cx('session-page')}>
                  <Sticky style={{zIndex: 5}}>
                      <Navigation />
                  </Sticky>

                  <div>
                    <section id="register" className={cx('section', 'overlay', 'bg4', 'light-text', 'align-center')}>
                      <div className={cx("container")}>
                        <h1>My Proposals</h1>
                      </div>
                    </section>

                    <section id="my-proposals" className={cx('section', 'container')}>
                        <div className={cx('col-md-7', 'col-md-offset-1')}>
                          {proposalsBlocks}
                        </div>

                        <div className={cx('col-md-4')}>
                          <Speaker name={name} imageUrl={picture || someSpeaker} oneLiner={oneLiner} bio={<span>{bio}</span>} linkedin={linkedin} twitter={twitter}></Speaker>
                        </div>

                    </section>
                  </div>

                  <Footer />
              </div>
            </StickyContainer>
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

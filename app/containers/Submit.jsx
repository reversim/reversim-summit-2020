import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import Navigation from './Navigation';
import About from './About';
import Footer from './Footer';
import { StickyContainer, Sticky } from 'react-sticky';
import Scroll, { Element } from 'react-scroll';
import {createProposal} from 'actions/proposals';
import { push } from 'react-router-redux';
import {updateUser} from 'actions/users'

import styles from 'css/main';

const cx = classNames.bind(styles)

class Submit extends Component {

    constructor(props) {
        super(props);

        const {dispatch, user: {authenticated }} = props;
        if (!authenticated) {
          dispatch(push('/'))
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {proposalType: 'full'};
    }

    chooseProposalType(newValue) {
      this.setState({
        proposalType: newValue
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      const formElements = event.target.elements;

      const fullname = formElements.fullname.value;
      const bio = formElements.bio.value;
      const trackRecord = formElements.trackRecord.value;

      const title = formElements.title.value;
      const proposalType = formElements.proposalType.value;
      const abstract = formElements.abstract.value;

      const { dispatch, user: { authenticated, id } } = this.props;

      if (authenticated) {
        dispatch(updateUser({ profile: {name: fullname, bio: bio, trackRecord: trackRecord } }))
        .then(() => dispatch(createProposal(title, abstract, proposalType, [id])))
        .then(() => dispatch(push('/')))
      }
    }


    render() {
        const { user } = this.props;
        console.log(user);

        return (
            <StickyContainer>
                <div className={cx('submit-page')}>
                    <Sticky style={{zIndex: 5}}>
                        <Navigation />
                    </Sticky>

                    <section id="submission-info" className={cx('section')}>
                      <div className={cx('container')}>
                        <div className={cx('align-center')}>
                          <span data-icon className={cx('icon', 'section-icon', 'icon-multimedia-12')}></span>
                          <h3>Reversim Summit 2016 - Submission</h3>
                          <p className={cx("text-alt")}>Read carefully before submit!</p>
                          <br />
                          <br />
                        </div>

                          <div className={cx('col-md-8', 'col-md-offset-2')}>
                            <h5>Topics</h5>
                            <p>You may get a good sense of the topics we're interested in by looking into previous events: Reversim Summit 2013 and Reversim Summit 2014 and Reversim Summit 2015</p>
                            <p>
                              Apart from that, here's a good grocery list of topics just to give you ideas. We are interested in everything including:
                              <ul>
                                <li>Software development</li>
                                <li>Software product development</li>
                                <li>UX</li>
                                <li>Startups</li>
                                <li>Mobile</li>
                                <li>Web</li>
                                <li>Devops</li>
                                <li>Data processing</li>
                                <li>Scaling</li>
                                <li>Software company culture</li>
                                <li>Tooling</li>
                              </ul>

                              There is no predefined list of topics, if you’d like to speak about something interesting, we want it!
                            </p>
                            <p>We do not set out with a predefined list of tracks. We would like to leave the topics (tracks) open and only after accepting the submissions we will split the sessions into tracks, but we shall not rule out a single good session just b/c it's not a natural fit to any of the predefined list, so don't worry so much about categorizing your submissions.</p>
                            <p>Generally speaking - we are not looking for “intro to something software” or “something software 101”. We’re looking for something of greater depth. However, we are open to session “intro to something that isn’t software”, as long is this something is of general interest, for example “intro to moonwalking and breakdance”</p>
                            <br /><p>There are three possible session types you may submit:</p>

                            <h6>Full Featured sessions (30-40 minutes)</h6>
                            <p>Full feature are frontal presentations b/w 30 - 40 minutes. They will be held either in the large room (500 ppl) or the small room (200 ppl) in two parallel tracks.</p>
                            <br />
                            <h6>Lightning Talks (5 minutes)</h6>
                            <p>Lightning are speedy 5 min sessions. They will be presented in a series in which each presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced and in total 5 min. No break b/w the sessions. It's fun, it's speedy, it's concise and it's breathtaking :-)</p>
                            <br />
                            <h6>Open Source in Israel (10 minutes)</h6>
                            <p>We are especially interested in open source projects made in israel or created by Israelis. We will have a special stage for that.</p>
                          </div>

                          <div style={{marginTop: '50px'}} className={cx('col-md-12', 'col-md-offset-2')}>
                            <h5>Submission</h5>
                            <p>You may submit multiple proposals.</p>
                            <p>Call for paper ends: <strong>June 30 midnight UTC</strong>. No kidding.</p>

                              <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
                                <h6>Bio</h6>
                                <fieldset>
                                  <span className={cx("col-xs-12")}>
                                    <label for="fullname">Full name</label>
                                  </span>
                                  <span className={cx("col-xs-5")}>
                                    <input id="fullname" ref="fullname" type="text" defaultValue={user.name} required />
                                  </span>
                                </fieldset>

                                <fieldset>
                                  <span className={cx("col-xs-12")}>
                                    <label for="email">Email</label>
                                  </span>
                                  <span className={cx("col-xs-5")}>
                                    {user.email}
                                  </span>
                                  <small className={cx("col-xs-4")}>So we can get in touch with you. Email is only visible to moderators</small>
                                </fieldset>


                                <fieldset>
                                  <span className={cx("col-xs-12")}>
                                    <label for="bio">Short Bio</label>
                                  </span>
                                  <span className={cx("col-xs-5")}>
                                    <textarea id="bio" ref="bio" defaultValue={user.bio}></textarea>
                                  </span>
                                  <small className={cx("col-xs-3")}>This will be presented on the website</small>
                                </fieldset>

                                <fieldset>
                                  <span className={cx("col-xs-12")}>
                                    <label for="trackRecord">Track record as speaker</label>
                                  </span>
                                  <span className={cx("col-xs-5")}>
                                    <textarea id="trackRecord" ref="trackRecord" defaultValue={user.trackRecord}></textarea>
                                  </span>
                                  <small className={cx("col-xs-3")}>Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)</small>
                                </fieldset>

                                <br />
                                <h6>Proposal</h6>
                                  <fieldset>
                                    <span className={cx("col-xs-12")}>
                                      <label for="title">Title</label>
                                    </span>
                                    <span className={cx("col-xs-5")}>
                                      <input id="title" ref="title" type="text" required />
                                    </span>
                                  </fieldset>

                                  <fieldset>
                                    <span className={cx("col-xs-5")}>
                                      <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" value="full" defaultChecked /> <label for="full">Full Featured (30-40 min.)</label></div>
                                      <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" value="lightning" /> <label for="lightning">Lightning Talk (5 min.)</label></div>
                                      <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" value="ossil" /> <label for="ossil">Open Source in Israel (10 min.)</label></div>
                                    </span>
                                  </fieldset>

                                  <fieldset>
                                    <span className={cx("col-xs-12")}>
                                      <label for="abstract">Abstract</label>
                                    </span>
                                    <span className={cx("col-xs-5")}>
                                      <textarea id="abstract" ref="abstract" required></textarea>
                                    </span>
                                  </fieldset>

                                  <fieldset className={cx("col-xs-4", "col-xs-offset-3")} style={{marginTop: '30px'}}>
                                    <input type="submit" value="submit" className={cx('btn', 'btn-lg')} />
                                  </fieldset>
                              </form>
                          </div>


                      </div>
                    </section>

                    <Footer />
                </div>
            </StickyContainer>
        );
    }
}

Submit.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Submit);

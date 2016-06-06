import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import {updateUser} from 'actions/users';
import NotificationSystem from 'react-notification-system';
import ga from 'react-ga';

import styles from 'css/main';

import defaultPic from 'images/default_speaker.png'

const cx = classNames.bind(styles);

class MyProfile extends Component {
    constructor(props) {
        super(props);

        const { dispatch, user: { authenticated, name, bio, oneLiner, linkedin, twitter, stackOverflow }} = props;
        if (!authenticated) {
          dispatch(push('/'))
        }

        this.state = {
          name,
          bio,
          oneLiner,
          linkedin,
          twitter,
          stackOverflow
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      const formElements = event.target.elements;

      const name = formElements.name.value;
      const oneLiner = formElements.oneLiner.value;
      const bio = formElements.bio.value;
      const trackRecord = formElements.trackRecord.value;
      const linkedin = formElements.linkedin.value;
      const twitter = formElements.twitter.value;
      const stackOverflow = formElements.stackOverflow.value;

      const { dispatch, user: { authenticated, id, email }, location: { state } } = this.props;

      if (authenticated) {
        dispatch(updateUser({
          'profile.name': name,
          'profile.bio': bio,
          'profile.trackRecord': trackRecord,
          'profile.linkedin': linkedin,
          'profile.twitter': twitter,
          'profile.oneLiner': oneLiner,
          'profile.stackOverflow': stackOverflow
        })).then(() => {
          if (state && state.from) {
            dispatch(push(state.from));
          } else {
            this.refs.notificationSystem.addNotification({
              title: 'Profile Updated!',
              level: 'success'
            });
            window.scrollTo(0, 0);
          }
        })
        .catch(e => ga.exception({
          description: `Error on update profile for user ${id} (${email}): ${e}`,
          fatal: true
        }));
      }
    }

    previewProfile(event) {
      let stateDiff = {};
      stateDiff[event.target.id] = event.target.value;
      this.setState(stateDiff);
    }

    cancel(event) {
      event.preventDefault();

      const { dispatch } = this.props;
      dispatch(goBack());
    }

    render() {
        const { user } = this.props;

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="my-profile">
                <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />

                <section id="my-profile" className={cx('section', 'container')}>
                    <div className={cx('col-md-7', 'col-md-offset-1')}>
                      <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
                        <h6>Bio</h6>
                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="name">Full name</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <input id="name" ref="name" type="text" value={this.state.name} onChange={this.previewProfile.bind(this)} required />
                          </span>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="email">Email</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            {user.email}
                          </span>
                          <small className={cx("col-xs-6")}>So we can get in touch with you. Email is only visible to moderators</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="oneLiner">One Liner</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <input id="oneLiner" ref="oneLiner" type="text" value={this.state.oneLiner} onChange={this.previewProfile.bind(this)} />
                          </span>
                          <small className={cx("col-xs-6")}>Optional. will be presented on the website</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="linkedin">Linkedin Profile</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <input id="linkedin" ref="linkedin" type="url" value={this.state.linkedin} onChange={this.previewProfile.bind(this)} />
                          </span>
                          <small className={cx("col-xs-6")}>Optional. will be presented on the website</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="twitter">Twitter @name</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <input id="twitter" ref="twitter" type="text" placeholder="@Reversim" value={this.state.twitter} onChange={this.previewProfile.bind(this)} />
                          </span>
                          <small className={cx("col-xs-6")}>Optional. will be presented on the website</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="stackOverflow">Stack Overflow Profile</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <input id="stackOverflow" ref="stackOverflow" type="url" value={this.state.stackOverflow} onChange={this.previewProfile.bind(this)} />
                          </span>
                          <small className={cx("col-xs-6")}>Optional. will be presented on the website</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="bio">Short Bio</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                          <textarea id="bio" ref="bio" value={this.state.bio} onChange={this.previewProfile.bind(this)} />
                          </span>
                          <small className={cx("col-xs-6")}>This will be presented on the website</small>
                        </fieldset>

                        <fieldset>
                          <span className={cx("col-xs-12")}>
                            <label htmlFor="trackRecord">Track record as speaker</label>
                          </span>
                          <span className={cx("col-xs-6")}>
                            <textarea id="trackRecord" ref="trackRecord" defaultValue={user.trackRecord} />
                          </span>
                          <small className={cx("col-xs-6")}>Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)</small>
                        </fieldset>

                        <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
                          <input type="submit" value="save" className={cx('btn', 'btn-sm')} />
                        </fieldset>

                        <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
                          <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.cancel.bind(this)}>Cancel</button>
                        </fieldset>
                      </form>
                    </div>

                    <div className={cx('col-md-4')}>
                      <Speaker name={this.state.name} imageUrl={user.picture || defaultPic} oneLiner={this.state.oneLiner} bio={this.state.bio} linkedin={this.state.linkedin} twitter={this.state.twitter} stackOverflow={this.state.stackOverflow}></Speaker>
                    </div>

                </section>
            </BaseLayout>
        );
    }
}

MyProfile.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

MyProfile.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(MyProfile);

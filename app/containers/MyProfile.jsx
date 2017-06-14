import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import BaseLayout from 'containers/BaseLayout';
import Speaker from 'components/Speaker';
import {updateUser, uploadProfileImage} from 'actions/users';
import NotificationSystem from 'react-notification-system';
import FormField from 'components/FormField';
import ga from 'react-ga';

import { cx } from 'css/styles';

import defaultPic from 'images/default_speaker.png'

function onFileWrapperClick(event) {
  if (event.target.childNodes.length === 4) event.target.childNodes[3].click();
}

class MyProfile extends Component {
    constructor(props) {
        super(props);

        const { dispatch, user: { authenticated, name, bio, oneLiner, linkedin, twitter, stackOverflow, trackRecord, phone } } = props;
        if (!authenticated) {
          dispatch(push('/'))
        }

        this.state = {
          name,
          bio,
          oneLiner,
          linkedin,
          twitter,
          stackOverflow,
          trackRecord,
          phone
        };

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
      const phone = formElements.phone.value;
      const teamMemberToken = window.location.hash.slice(1);

      const { dispatch, user: { authenticated, id, email }, location: { state } } = this.props;

      if (authenticated) {
        dispatch(updateUser({
          'profile.name': name,
          'profile.bio': bio,
          'profile.trackRecord': trackRecord,
          'profile.linkedin': linkedin,
          'profile.twitter': twitter,
          'profile.oneLiner': oneLiner,
          'profile.phone': phone,
          'profile.stackOverflow': stackOverflow,
          teamMemberToken
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

    onImageSelected(e) {
      const { dispatch, user: { id } } = this.props;
      var files = e.target.files;
      var f = files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        dispatch(uploadProfileImage({ id, imageBinary: e.target.result }));
      };

      reader.readAsDataURL(f);

    }

    renderField(props, index) {
      return <FormField key={index} {...props} value={this.state[props.id]} onChange={this.previewProfile.bind(this)}/>;
    }

    render() {
        const { user } = this.props;
        const fields = [
          { label: "Full name", id: "name", isRequired: true },
          { label: "Email", text: user.email, caption: "So we can get in touch with you. Email is only visible to moderators" },
          { label: "One liner", id: "oneLiner" },
          { label: "LinkedIn profile", id: "linkedin", inputType: "url" },
          { label: "Twitter handle", id: "twitter", placeholder: "@Reversim" },
          { label: "Stack Overflow profile", id: "stackOverflow", inputType: "url" },
          { label: "Phone number", id: "phone", inputType: "tel" },
          { label: "Short Bio", id: "bio", multiline: true, fullRow: true, caption: null },
          { label: "Track record as speaker", id: "trackRecord", multiline: true, subtitle: 'Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)', caption: null, fullRow: true },
        ].map(this.renderField.bind(this));

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="my-profile">
                <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />

                <section id="my-profile" className={cx('section', 'container')}>
                    <div className={cx('col-md-7', 'col-md-offset-1')}>
                      <form onSubmit={this.handleSubmit} className={cx('form')}>
                        <h6>Bio</h6>

                        {fields}

                        <fieldset className="row">
                          <div className="col-xs-2 col-xs-offset-2">
                            <input type="submit" value="save" className={cx('btn', 'btn-sm')} style={{marginTop: '30px'}}/>
                          </div>
                          <div className="col-xs-2 col-xs-offset-2">
                            <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.cancel.bind(this)} style={{marginTop: '30px'}}>Cancel</button>
                          </div>
                        </fieldset>
                      </form>
                    </div>

                    <div className={cx('col-md-4')}>
                      <Speaker name={this.state.name} imageUrl={user.picture || defaultPic}
                               oneLiner={this.state.oneLiner}
                               bio={this.state.bio}
                               linkedin={this.state.linkedin}
                               twitter={this.state.twitter}
                               stackOverflow={this.state.stackOverflow} />
                      <button className={cx("btn", "btn-sm", "col-xs-12")} style={{ letterSpacing: '0.3em'}} onClick={onFileWrapperClick}>
                        Upload Picture (1MB max size)
                        <input type='file' className={cx('hidden')} onChange={this.onImageSelected.bind(this)}/>
                      </button>
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

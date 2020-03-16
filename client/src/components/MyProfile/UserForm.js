import React, {Component, Fragment} from 'react';
import _ from 'lodash';

import FormField from '../FormField';
import PublicInfo from '../CFP/CFPForm/PublicInfo';
import ShortBio from '../CFP/CFPForm/ShortBio';
import PrivateInfo from '../CFP/CFPForm/PrivateInfo';



export const getUserData = formElements => {
  const fullname = formElements.fullname.value;
  const oneLiner = formElements.oneLiner.value;
  const bio = formElements.bio.value;
  const trackRecord = formElements.trackRecord.value;
  const linkedin = formElements.linkedin.value;
  const twitter = formElements.twitter.value;
  const github = formElements.github.value;
  const phone = formElements.phone.value;
  const videoUrl = formElements.video_url.value;

  return {
    name: fullname,
    bio: bio,
    trackRecord: trackRecord,
    linkedin: linkedin,
    twitter: twitter,
    github: github,
    oneLiner: oneLiner,
    phone: phone,
    video_url: videoUrl,
  };
}; // NOTE: This beauty returns an Object with the user's info based on what was typed in the form

const SPACING = 'mb-6'; //NOTE: Should get rid of this

const VideoUrlFieldCaption = () => (
  <span>
    <ul>
      <li>
        <b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.</li>
      <li>
        <b>New speakers</b>: A short video introducing you and the planned session outline.
        <br/>Please see <a href="https://www.youtube.com/watch?v=F09My4646hI">https://www.youtube.com/watch?v=F09My4646hI</a> for guidance
      </li>
    </ul>
    <i>
      <b>Note</b>: You may reuse this video link in the below "Track record" section.
    </i>
  </span>
);



const USER_INFO = 'userInfo';

class UserForm extends Component {

  constructor(props) {
    super(props);

    const userInfo = {
      name: this.props.user.name,
      oneLiner: null,
      affiliation: '',
      linkedin: '',
      github: '',
      twitter: '',
      bio: '',
      email: this.props.user.email,
      phone: '',
      video_url: '',
      trackRecord: '',
      _id: [this.props.user._id],
    };

    this.USER_INFO_KEY = `${USER_INFO}@${this.props.user._id}`;

    const localUserInfo = JSON.parse(localStorage.getItem(this.USER_INFO_KEY));

    this.state = {
      [USER_INFO]: _.assign({}, userInfo, localUserInfo)
    };
  }

  setValue = (form, field, value) => {
    const currentRelevantForm = _.get(this.state, form);
    const currentRelevantValue = _.get(this.state, [form, field]);

    const updatedRelevantForm = _.isArray(currentRelevantValue)
      ? _.assign({}, currentRelevantForm, {[field]: [...currentRelevantValue, value]})
      : _.assign({}, currentRelevantForm, {[field]: value});

    this.setState(
      {
        [form]: updatedRelevantForm,
      },
      () => {
        console.log('%c sending state to local storage', 'background:gold; color: purple;', this.state);

        form === USER_INFO
          ? localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(this.state.userInfo))
          : localStorage.setItem(
              this.CURRENT_PROPOSAL_KEY,
              JSON.stringify(this.state.currentProposal)
            );
      },
    );
  };

  setValueDebounced = _.debounce(this.setValue, 250);

  setUserInfoValueDebounced = _.partial(this.setValueDebounced, USER_INFO);

  render() {
    const {userInfo} = this.state;
    const {
      userInfo:{
        name,
        oneLiner,
        affiliation,
        linkedin,
        github,
        twitter,
        bio,
        email,
        phone,
        video_url,
        trackRecord
      }
    } = this.state ;

    return (
      <Fragment>
        <PublicInfo
          name={name}
          oneLiner={oneLiner}
          affiliation={affiliation}
          linkedin={linkedin}
          github={github}
          twitter={twitter}
          setValueDebounced={this.setUserInfoValueDebounced}
        />

        <ShortBio bio={bio} setValueDebounced={this.setUserInfoValueDebounced} />

        <PrivateInfo user={userInfo}
          email={email}
          phone={phone}
          videoUrl={video_url}
          trackRecord={trackRecord}
          setValueDebounced={this.setUserInfoValueDebounced}
        />
      </Fragment>
    );
  }
}

export default UserForm;

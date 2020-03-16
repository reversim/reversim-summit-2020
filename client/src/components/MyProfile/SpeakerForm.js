import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import StepZilla from 'react-stepzilla';
import ga from 'react-ga';

import PublicInfo from '../CFP/CFPForm/PublicInfo';
import ShortBio from '../CFP/CFPForm/ShortBio';
import SpeakerEditPrivateInfo from './SpeakerEditPrivateInfo';

import {
  HeadingAligner,
  Heading3,
  BreakLineMain,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

//styled-components section

const FormHeading = styled(Heading3)`
  ${({ theme: { color, font } }) => `
    color: ${color.text_3};
    font-size: ${font.size_h4};
  `};
  ${mediaQueryMin.m`
    ${({ theme: { font } }) => `
      font-size: ${font.size_h3};
    `};
  `}
`;

const FormBreakLine = styled(BreakLineMain)`
  ${mediaQueryMin.s`
  display: none;
  `}
  ${mediaQueryMin.xl`
  display: inline;
  `}
`;

//React components section

const USER_INFO = 'userInfo';

class SpeakerForm extends Component {
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
      () => localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(this.state.userInfo)),
    );
  };

  setValueDebounced = _.debounce(this.setValue, 250);

  setUserInfoValueDebounced = _.partial(this.setValueDebounced, USER_INFO);

  getLocalForm = form => JSON.parse(localStorage.getItem(form));

  handleSubmit = async e => {
    e.preventDefault();

    const {userInfo} = this.state;
    const {updateUserData, history} = this.props;

    try {
      await updateUserData(userInfo);
      // const result = await createProposal(currentProposal);
      // result && localStorage.removeItem(this.CURRENT_PROPOSAL_KEY);  NOTE: not so sure but I think this is no in user here

      history.push(`/speaker/${result._id}`);
    } catch (ex) {
      ga.exception({
        description: `Error on submit: ${ex}`,
        fatal: true,
      });
    }
  };

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

    const steps = [
      {
        name: 'Public Info',
        component: (
          <PublicInfo
            name={name}
            oneLiner={oneLiner}
            affiliation={affiliation}
            linkedin={linkedin}
            github={github}
            twitter={twitter}
            setValueDebounced={this.setUserInfoValueDebounced}
          />
        ),
      },
      {
        name: 'Short Bio',
        component: <ShortBio bio={bio} setValueDebounced={this.setUserInfoValueDebounced} />,
      },
      {
        name: 'Private Info',
        component: (
          <SpeakerEditPrivateInfo
            user={userInfo}
            email={email}
            phone={phone}
            videoUrl={video_url}
            trackRecord={trackRecord}
            setValueDebounced={this.setUserInfoValueDebounced}
            handleSubmit={this.handleSubmit}
          />
        ),
      },
    ];

    return (
      <Fragment>
        <HeadingAligner>
          <FormHeading>{userInfo.name.split(' ')[0]}, edit your personal info</FormHeading>
          <FormBreakLine />
        </HeadingAligner>
        <StepZilla
          preventEnterSubmission={true}
          steps={steps}
        />
      </Fragment>
    );
  }
};

export default SpeakerForm;

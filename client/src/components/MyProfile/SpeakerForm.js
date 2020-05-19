import React from 'react';
import styled from 'styled-components';
import ga from 'react-ga';

import {getHref} from '../../utils';
import UserForm from './UserForm';
import {StyledButton, InvertedColorLink} from '../GlobalStyledComponents/ReversimStyledComps';


const getUserData = formElements => {
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
};

// styled-components components

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled(StyledButton)`
  ${({ theme: { space } }) => `
    width: max-content;
    min-width: initial;
    margin: 0 ${space.xl} ${space.s} 0px;
    `}
`;


// React components

class SpeakerForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();

    const {user, updateUserData, history} = this.props;

    if (user) {
      try {
        let newUser = getUserData(e.target.elements);
        newUser._id = user._id;
        await updateUserData(newUser);
        history.push(`/speaker/${user._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  render() {
    const {user} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <UserForm user={user} />

        <ButtonContainer>
          <SubmitButton>
            Submit
          </SubmitButton>
          <InvertedColorLink href={`/speaker/${getHref(user)}`}>Cancel</InvertedColorLink>
        </ButtonContainer>

      </form>
    );
  }
}

export default SpeakerForm;

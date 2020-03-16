//SpeakerForm.js //DELETE WHEN DONE

import React from 'react';
import styled from 'styled-components';
import ga from 'react-ga';

import {getHref} from '../../utils';
import UserForm, {getUserData} from './UserForm';
import {StyledButton, InvertedColorLink} from '../GlobalStyledComponents/ReversimStyledComps';


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

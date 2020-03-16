import React from 'react';
import styled from 'styled-components';

import Redirect from '../Redirect';
import SpeakerPageRoute from './SpeakerPageRoute';
import Page from '../Page';

import SpeakerForm from './SpeakerForm';
import {AlignCenterColumn} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

// styled-components components

const MainContainer = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    margin: calc(3 * ${space.xxl}) auto ${space.xxl} auto;
  `}
`;

// React components components

const SpeakerEditPage = ({speaker, user, updateUserData, ...props}) => (
  <Page title={`Edit ${speaker.name}`} user={user} {...props}>
    <MainContainer>
      <SpeakerForm user={speaker} updateUserData={updateUserData} {...props} />
    </MainContainer>
  </Page>
);

export default Redirect(SpeakerPageRoute(SpeakerEditPage));

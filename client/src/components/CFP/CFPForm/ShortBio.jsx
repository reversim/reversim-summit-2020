import React from 'react';
import styled from 'styled-components';

import {
  StepContainer,
  StepHeading,
  FormField,
} from '../../GlobalStyledComponents/ReversimStyledComps';

const ShortBiography = styled(FormField)`
  ${({ theme: { space } }) => `
    margin-bottom: calc(4 * ${space.m});
  `}
`;

const ShortBio = ({user, setValue}) => (
  <StepContainer>
    <StepHeading>Short Bio</StepHeading>
    <ShortBiography
      id="bio"
      value={user.bio}
      placeholder=""
      required={true}
      multiline={true}
      subtitle={
        <span>
          Tell everybody a little bit about yourself. Useful sentences can be:<br />
          <br />
          “A front-end developer for the last X years”<br />
          “I work remotely, and interested in building remote teams and effective internal
          communication”<br />
          “I enjoy developing and using open source code”<br />
          “I participate in the Meetup X”<br />
          “I have been influenced by the book ‘The Pragmatic Programmer’”<br />
          “I have been playing with Deep Learning recently, took some online courses and eager to
          learn more!”<br />
          “I am an avid wikipedia contributor”
        </span>
      }
      onChange={e => setValue('userInfo', 'bio', e.target.value)}
    />
  </StepContainer>
);

export default ShortBio;

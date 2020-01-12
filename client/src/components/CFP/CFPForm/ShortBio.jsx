import React, {Fragment} from 'react';
import styled from 'styled-components';

import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {
  Paragraph,
  StepContainer,
  StepHeading,
  ListItem,
  ListBolt,
  FormField,
} from '../../GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const ShortBioParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
  `}
`;

const ShortBioSubHeading = styled.h6`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_bold};
  `}
`;

const ShortBioList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0 ${space.xl} 0;
  `}
`;

const ShortBiography = styled(FormField)`
  ${({ theme: { space } }) => `
    margin-bottom: calc(4 * ${space.m});
  `}
`;


//React components
const Caption = () => (
  <Fragment>
    <ShortBioParagraph>Tell everybody a little bit about yourself. Useful sentences can be:</ShortBioParagraph>
    <ShortBioSubHeading>For example:</ShortBioSubHeading>
    <ShortBioList>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “A front-end developer for the last X years”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I work remotely, and interested in building remote teams and effective internal
        communication”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I enjoy developing and using open source code”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I participate in the Meetup X”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I have been influenced by the book ‘The Pragmatic Programmer’”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I have been playing with Deep Learning recently, took some online courses and eager to
        learn more!”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I am an avid wikipedia contributor”
      </ListItem>
    </ShortBioList>
  </Fragment>
);

const ShortBio = ({user, setValueDebounced}) => (
  <StepContainer>
    <StepHeading>Short Bio</StepHeading>
    <ShortBiography
      id="bio"
      value={user.bio}
      placeholder="We want to know you better."
      required={true}
      multiline={true}
      subtitle={<Caption />}
      onChange={e => setValueDebounced('bio', e.target.value)}
    />
  </StepContainer>
);

export default ShortBio;

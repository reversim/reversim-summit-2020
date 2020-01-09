import React from 'react';
import {
  StepContainer,
  StepHeading,
  FormSubHeading,
  FormField,
} from '../../GlobalStyledComponents/ReversimStyledComps';

const PublicInfo = ({user, setValue}) => (
  <StepContainer>
    <StepHeading>Public information</StepHeading>
    <FormSubHeading>The following information will be presented on the website.</FormSubHeading>
    <FormField
      id="fullname"
      label="Full name"
      required={true}
      placeholder="Your name"
      value={user.name}
      onChange={e => setValue('userInfo', 'fullname', e.target.value)}
    />
    <FormField
      id="oneLiner"
      label="One Liner"
      value={user.oneLiner}
      maxLength={100}
      subtitle="Maximum 100 characters"
      placeholder="COBOL developer at Acme Corp"
      onChange={e => setValue('userInfo', 'oneLiner', e.target.value)}
    />
    <StepHeading>Media</StepHeading>
    <FormSubHeading>The following information will be presented on the website</FormSubHeading>
    <FormField
      id="linkedin"
      label="Linkedin Profile"
      value={user.linkedin}
      inputType="url"
      placeholder="https://www.linkedin.com/in/reversim/"
      onChange={e => setValue('userInfo', 'linkedin', e.target.value)}
    />
    <FormField
      id="github"
      label="GitHub username"
      value={user.github}
      placeholder="podcaster"
      onChange={e => setValue('userInfo', 'github', e.target.value)}
    />
    <FormField
      id="twitter"
      label="Twitter @name"
      value={user.twitter}
      placeholder="@Reversim"
      onChange={e => setValue('userInfo', 'twitter', e.target.value)}
    />
  </StepContainer>
);

export default PublicInfo;

import React from 'react';
import FormField, {SPACING} from '../../FormField';

import {
  StepContainer,
  StepHeading,
  FormSubHeading,
} from '../../GlobalStyledComponents/ReversimStyledComps';

const PublicInfo = ({user, setValue}) => (
  <StepContainer>
    <StepHeading>Public information</StepHeading>
    <FormSubHeading>
      The following information will be presented on the website.
    </FormSubHeading>
    <FormField
      id="fullname"
      label="Full name"
      required={true}
      placeholder="Your name"
      value={user.name}
      className={SPACING}
      onChange={e => setValue('user', 'fullname', e.target.value)}
    />
    <FormField
      id="oneLiner"
      label="One Liner"
      value={user.oneLiner}
      maxLength={100}
      className={SPACING}
      subtitle="Maximum 100 characters"
      placeholder="COBOL developer at Acme Corp"
      onChange={e => setValue('user', 'oneLiner', e.target.value)}
    />
    <StepHeading>Media</StepHeading>
    <FormSubHeading>
      The following information will be presented on the website
    </FormSubHeading>
    <FormField
      id="linkedin"
      label="Linkedin Profile"
      value={user.linkedin}
      inputType="url"
      className={SPACING}
      placeholder="https://www.linkedin.com/in/reversim/"
      onChange={e => setValue('user', 'linkedin', e.target.value)}
    />
    <FormField
      id="github"
      label="GitHub username"
      value={user.github}
      placeholder="podcaster"
      className={SPACING}
      onChange={e => setValue('user', 'github', e.target.value)}
    />
    <FormField
      id="twitter"
      label="Twitter @name"
      value={user.twitter}
      placeholder="@Reversim"
      className={SPACING}
      onChange={e => setValue('user', 'twitter', e.target.value)}
    />
  </StepContainer>
)

export default PublicInfo;

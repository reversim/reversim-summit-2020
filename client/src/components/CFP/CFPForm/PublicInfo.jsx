import React from 'react';
import FormField, {SPACING} from '../../FormField';

import {
  StepHeading,
  FormSubHeading,
} from '../../GlobalStyledComponents/ReversimStyledComps';

const PublicInfo = ({user}) => (
  <div>
    <StepHeading>Public information</StepHeading>
    <FormSubHeading className="font-size-sm text-gray-600">
      The following information will be presented on the website.
    </FormSubHeading>
    <FormField
      id="fullname"
      label="Full name"
      required={true}
      placeholder="Your name"
      value={user.name}
      className={SPACING}
    />
    <FormField
      id="oneLiner"
      label="One Liner"
      value={user.oneLiner}
      maxLength={100}
      className={SPACING}
      subtitle="Maximum 100 characters"
      placeholder="COBOL developer at Acme Corp"
    />
    <StepHeading className="mb-0">Media</StepHeading>
    <FormSubHeading className="font-size-sm text-gray-600">
      The following information will be presented on the website
    </FormSubHeading>
    <FormField
      id="linkedin"
      label="Linkedin Profile"
      value={user.linkedin}
      inputType="url"
      className={SPACING}
      placeholder="https://www.linkedin.com/in/reversim/"
    />
    <FormField
      id="github"
      label="GitHub username"
      value={user.github}
      placeholder="podcaster"
      className={SPACING}
    />
    <FormField
      id="twitter"
      label="Twitter @name"
      value={user.twitter}
      placeholder="@Reversim"
      className={SPACING}
    />
  </div>
)

export default PublicInfo;

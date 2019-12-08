import React from "react";
import styled from "styled-components";
import FormField, {SPACING} from '../../FormField';

const StepTwo = ({user}) => (
  <div>
    <h4 className="mb-0">Media</h4>
    <p className="font-size-sm text-gray-600">
      The following information will be presented on the website
    </p>
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

export default StepTwo;
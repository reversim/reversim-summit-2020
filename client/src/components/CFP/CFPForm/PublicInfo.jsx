import React, { Component } from 'react';
import Joi from '@hapi/joi';

import {
  StepContainer,
  StepHeading,
  FormSubHeading,
  FormField,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';

class PublicInfo extends Component {
  constructor(props){
    super(props);
    this.state = {      
      validationError: {
        field: '',
        message: '',
      },
    };
  };

  validationSchema = Joi.object({
    fullname: Joi.string().required().label('Full Name'),
    oneLiner: Joi.string().max(100).required().label('One Liner'),
    affiliation: Joi.string().label('Affiliation'),
    linkedin: Joi.string().regex(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile).*$/, 'Linkedin profile url').label('Linkedin Profile'),
    github: Joi.string().regex(/^\w[\w-]*$/, 'GitHub username').label('GitHub Username'),
    twitter: Joi.string().regex(/^@\w{2,15}$/, 'Twitter username').label('Twitter @username'),
  });

  isValidated = () => {
    const {
      fullname,
      oneLiner,
      affiliation,
      linkedin,
      github,
      twitter,
    } = this.props

    const toValidate = {
      fullname,
      oneLiner,
      affiliation,
      linkedin,
      github,
      twitter,
    };

    const {error} = this.validationSchema.validate(toValidate);
    
    const validationError = error 
    ? {
      validationError: {
        field: error.details[0].path[0],
        message: error.details[0].message,
      },
    }
    : {};
    
    error && console.log('Error is: ', error.details[0]); // DELETE WHEN DONE

    const newState = _.assign({}, this.state, validationError);

    error && this.setState(newState);

    return error ? false : true;
  };

  render(){
    const {validationError} = this.state;

    const {
      fullname,
      oneLiner,
      affiliation,
      linkedin,
      github,
      twitter,
      setValueDebounced
    } = this.props
  
    return (
        <StepContainer>
        <StepHeading>Public information</StepHeading>
        <FormSubHeading>The following information will be presented on the website.</FormSubHeading>
        <FormField
          id="fullname"
          label="Full Name"
          required={true}
          placeholder="Your name"
          value={fullname}
          onChange={e => setValueDebounced('fullname', e.target.value)}
        />
        {validationError.field === "fullname" && ValidationWarning(validationError.message)}

        <FormField
          id="oneLiner"
          label="One Liner"
          value={oneLiner}
          maxLength={101}
          subtitle="Maximum 100 characters"
          placeholder="COBOL developer at Acme Corp"
          onChange={e => setValueDebounced('oneLiner', e.target.value)}
        />
        {validationError.field === "oneLiner" && ValidationWarning(validationError.message)}

        <FormField
          id="affiliation"
          label="Affiliation"
          value={affiliation}
          maxLength={100}
          subtitle="Who is current employer or are you self-employed? What brings you to Reversim 2020?"
          placeholder="You look familiar.."
          onChange={e => setValueDebounced('affiliation', e.target.value)}
        />
        {validationError.field === "affiliation" && ValidationWarning(validationError.message)}

        <StepHeading>Media</StepHeading>
        <FormSubHeading>The following information will be presented on the website</FormSubHeading>
        <FormField
          id="linkedin"
          label="Linkedin Profile"
          value={linkedin}
          inputType="url"
          placeholder="https://www.linkedin.com/in/reversim/"
          onChange={e => setValueDebounced('linkedin', e.target.value)}
        />
        {validationError.field === "linkedin" && ValidationWarning(validationError.message)}

        <FormField
          id="github"
          label="GitHub Username"
          value={github}
          placeholder="podcaster"
          onChange={e => setValueDebounced('github', e.target.value)}
        />
        {validationError.field === "github" && ValidationWarning(validationError.message)}

        <FormField
          id="twitter"
          label="Twitter @username"
          value={twitter}
          placeholder="@Reversim"
          onChange={e => setValueDebounced('twitter', e.target.value)}
        />
        {validationError.field === "twitter" && ValidationWarning(validationError.message)}
        
        </StepContainer>
      );
    }
};
      
export default PublicInfo;

import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import Joi from '@hapi/joi';
import { faChevronRight, faBookDead } from '@fortawesome/free-solid-svg-icons';

import {PROPOSAL_TYPES_ARR} from '../../../data/proposals';
import {
  StepContainer,
  StepHeading,
  FormSubHeading,
  InvertedColorLink,
  ListItem,
  ListBolt,
  Important,
  FormField,
  InputLabel,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';

// styled-components components
const TitlesList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.l} auto;
  `};
`;
const ProposalTypes = styled.div`
  ${({ theme: { space } }) => `
    margin: ${space.l} auto
  `};
`;

const PostmortemConfirm = styled(Important)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
  `}
`;
const PostmortemIcon = styled(ListBolt)`
  ${({ theme: { color, font } }) => `
    font-size: ${font.size_bg};
    color: ${color.important};
  `}
`;

//React components
const TitleFieldCaption = () => (
  <Fragment>
    Make it descriptive, concise, and appealing. You are welcome to review{' '}
    <InvertedColorLink href="http://summit2018.reversim.com/schedule" target="_blank" rel="noopener noreferrer">
      last year’s agenda
    </InvertedColorLink>, or use the following examples:
    <TitlesList>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “How we optimized micro-service utilization using machine learning”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “Writing on sand? Embracing CI-CD techniques in the HR team”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “Effective Hackathon: How to re-write a project in 24 hours and save your startup”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”
      </ListItem>
    </TitlesList>
    Reversim Summit is about deep-tech, and we will reject trivial introductory talks in
    software-related sessions (introduction to other topics is OK).
  </Fragment>
);

const ProposalType = ({proposalType, ossilProject, setValue}) => (
  <ProposalTypes>
    <InputLabel>Proposal Types</InputLabel>
    <FormField
      id="proposalType"
      inputType="radio"
      values={PROPOSAL_TYPES_ARR}
      value={proposalType}
      onChange={e => setValue('proposalType', e.target.value)}
    />
    {proposalType === 'ossil' && (
      <FormField
        id="ossilProject"
        label="Add a link to the relevant project"
        value={ossilProject}
        inputType="url"
        placeholder="www.yourProject.com"
        onChange={e => setValue('ossilProject', e.target.value)}
      />
    )}
    {proposalType === 'postmortem' && (
      <PostmortemConfirm>
        <PostmortemIcon icon={faBookDead} />
        Are you sure this is a postmortem session?
        Please read about the <a href="/cfp#postmortems" target="_blank">postmortems</a> format.
      </PostmortemConfirm>
    )}
  </ProposalTypes>
);

const CoSpeakerFieldCaption = () => (
  <p>If you want to lecture with another speaker, add their email here. Both of you will be able to edit the lecture.<br/>
  <Important>Make sure your co-speaker has already signed in to our site!</Important></p>
 );

class SessionProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      validationError: {
        field: '',
        message: '',
      },
    };
  };

  validationSchema = Joi.object().keys({
    title: Joi.string().required().label('Proposal Title'),
    proposalType: Joi.string().required().label('Proposal Type'),
    ossilProject: Joi.when('proposalType', {
      is: Joi.string().valid('ossil').required(),
      then: Joi.string().regex(/^(http(s)?:\/\/)(www\.).*$/, 'valid URL').required(),
      otherwise: Joi.optional(),
    }).label('Open Source Project'),
    coSpeaker: Joi.string().email({ tlds: { allow: false } }).label('Co Speaker Email').allow(''),
  });

  isValidated = () => {
    const {
      title,
      proposalType,
      ossilProject,
      coSpeaker,
    } = this.props

    const toValidate = {
      title,
      proposalType,
      ossilProject,
      coSpeaker,
    };

    const {error} = this.validationSchema.validate(toValidate);
    
    const validationError = error 
    ? {
      validationError: {
        field: error.details[0].path[0],
        message: error.details[0].message,
      },
    }
    : {
      validationError: {
        field: '',
        message: '',
      },
    };
    
    error && console.log('Error is: ', error.details[0]); // DELETE WHEN DONE

    const newState = _.assign({}, this.state, validationError);

    this.setState(newState);

    return error ? false : true;
  };

  render() {
    const {validationError} = this.state;
    const {
      title,
      proposalType,
      ossilProject,
      coSpeaker,
      setValue,
      setValueDebounced,
    } = this.props;

    return (
      <StepContainer>
        <StepHeading>Session Proposal</StepHeading>
        <FormSubHeading>Tell us about your session, so we can present it on our website.</FormSubHeading>
        <FormField
          id="title"
          label="Title"
          placeholder="Title of your talk"
          maxLength="100"
          subtitle={<TitleFieldCaption />}
          value={title}
          onChange={e => setValueDebounced('title', e.target.value)}
          onBlur={this.isValidated}
        />
        {validationError.field === "title" && ValidationWarning(validationError.message)}
        <ProposalType 
          setValue={setValue}
          proposalType={proposalType}
          ossilProject={ossilProject}
          onBlur={this.isValidated}
        />
        {validationError.field === "proposalType" && ValidationWarning(validationError.message)}
        {validationError.field === "ossilProject" && ValidationWarning(validationError.message)}
        <FormField
          id="coSpeaker"
          label="Co-Speaker (optional)"
          required={false}
          value={coSpeaker}
          placeholder={`co.speaker@email.com`}
          subtitle={<CoSpeakerFieldCaption />}
          onChange={e => setValueDebounced('coSpeaker', e.target.value)}
          onBlur={this.isValidated}
        />
        {validationError.field === "coSpeaker" && ValidationWarning(validationError.message)}
      </StepContainer>
    );
  };
};
export default SessionProposal;

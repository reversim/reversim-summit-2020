import React, {Fragment, Component} from 'react';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
} from '../../GlobalStyledComponents/ReversimStyledComps';

const TitleFieldCaption = () => (
  <Fragment>
    Make it descriptive, concise, and appealing. You are welcome to review{' '}
    <InvertedColorLink href="http://summit2018.reversim.com/schedule" target="_blank" rel="noopener noreferrer">
      last year’s agenda
    </InvertedColorLink>, or use the following examples:<br />
    <br />
    <ul>
      <ListItem>
        <ListBolt icon={faChevronRight} />“How we optimized micro-service utilization using machine learning”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />“Writing on sand? Embracing CI-CD techniques in the HR team”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />“Effective Hackathon: How to re-write a project in 24 hours and save your startup”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />“Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”
      </ListItem>
    </ul>
    Reversim Summit is about deep-tech, and we will reject trivial introductory talks in
    software-related sessions (introduction to other topics is OK).
  </Fragment>
);

const CoSpeakerFieldCaption = () => (
  <p>If you want to lecture with another speaker, add their email here. Both of you will be able to edit the lecture.<br/>
  <Important>Make sure your co-speaker has already signed in to our site!</Important></p>
 );

class SessionProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coSpeaker: props.coSpeaker,
    };
    this.onChangeCoSpeaker = this.onChangeCoSpeaker.bind(this);
  }

  onChangeCoSpeaker = e => {
    this.props.update({coSpeaker: e.target.value});
    // this.setState({
    //   abstractLen,
    //   abstractErr,
    // });
  };

  render () {  
    const {
      proposalType,
      title,
      setValue,
      setProposalType,
    } = this.props;
    const { coSpeaker } = this.state;

    return (
      <StepContainer>
        {/* CFPForm.js section */}
        <StepHeading>Session Proposal</StepHeading>
        <FormSubHeading>Tell us about your session, so we can present it on our website.</FormSubHeading>
        {/* ProposalForm.js section */}
        <FormField
          id="title"
          label="Title"
          required={true}
          placeholder="Title of your talk"
          maxLength="100"
          subtitle={<TitleFieldCaption />}
          value={title}
          onChange={e => setValue('proposal', 'title', e.target.value)}
        />
        <FormField
          id="proposalType"
          inputType="radio"
          required={true}
          values={PROPOSAL_TYPES_ARR}
          value={proposalType}
          onChange={e => setProposalType('proposal', 'proposalType', e.target.value)}
        />{/* NOTE: radio buttons don't react */}
        <FormField
          id="coSpeaker"
          label="Co-Speaker (optional)"
          required={false}
          placeholder={`co.speaker@email.com`}
          subtitle={<CoSpeakerFieldCaption />}
          value={coSpeaker}
          onChange={e => setValue('proposal', 'coSpeaker', e.target.value)}
        />
      </StepContainer>
    );
  }
};

export default SessionProposal;

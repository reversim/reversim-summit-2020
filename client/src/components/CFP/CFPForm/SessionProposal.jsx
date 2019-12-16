import React, {Fragment, Component} from 'react';
import FormField, {SPACING} from '../../FormField';

import cn from 'classnames';
import {titleInput} from '../CFPPage.css';
import {PROPOSAL_TYPES_ARR} from '../../../data/proposals';

const TitleFieldCaption = () => (
  <span>
    Make it descriptive, concise, and appealing. You are welcome to review{' '}
    <a href="http://summit2018.reversim.com/schedule" target="_blank" rel="noopener noreferrer">
      last year’s agenda
    </a>, or use the following examples:<br />
    <br />
    <ul>
      <li>
        <i>“How we optimized micro-service utilization using machine learning”</i>
      </li>
      <li>
        <i>“Writing on sand? Embracing CI-CD techniques in the HR team”</i>
      </li>
      <li>
        <i>“Effective Hackathon: How to re-write a project in 24 hours and save your startup”</i>
      </li>
      <li>
        <i>
          “Cost of choosing the wrong development stack: A learn-build-measure story from the
          trenches”
        </i>
      </li>
    </ul>
    Reversim Summit is about deep-tech, and we will reject trivial introductory talks in
    software-related sessions (introduction to other topics is OK).
  </span>
);

const CoSpeakerFieldCaption = () => (
  <span>
    <span>If you want to lecture with another speaker, add their email here. Both of you will be able to edit the lecture.</span><br/>
    <span className='text-red'>Make sure your co-speaker has already signed in to out site!</span>
  </span>
 );

class SessionProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coSpeaker: props.coSpeaker,
    };
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
      update,
      tags,
      proposalType,
      categories,
      missingCategories,
      allTags,
      title,
    } = this.props;
    const { coSpeaker } = this.state;

    return (
      <Fragment>
        {/* CFPForm.js section */}
        <h3 className="mb-0">Session Proposal</h3>
        <p className="text-gray-600">Tell us about your session</p>
        {/* ProposalForm.js section */}
        <h4 className="mb-0">Public information</h4>
        <p className="font-size-sm text-gray-600">
          The following information will be presented in the website
        </p>
        <FormField
          id="title"
          label="Title"
          required={true}
          placeholder="Title of your talk"
          maxLength="100"
          value={title}
          className={cn(SPACING, titleInput)}
          subtitle={<TitleFieldCaption />}
        />
        <FormField
          id="proposalType"
          inputType="radio"
          required={true}
          onChange={this.handleProposalTypeChange}
          values={PROPOSAL_TYPES_ARR}
          value={proposalType}
          className={SPACING}
        />
        <FormField
          id="coSpeaker"
          label="Co-Speaker (optional)"
          required={false}
          placeholder={`co.speaker@email.com`}
          subtitle={<CoSpeakerFieldCaption/>}
          onChange={this.onChangeCoSpeaker}
          className={SPACING}
          value={coSpeaker}
        />
      </Fragment>
    );
  }
};

export default SessionProposal;
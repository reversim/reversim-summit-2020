import React, {Fragment} from 'react';
import FormField, {SPACING} from '../../FormField';

const SessionProposal = props => {
  const {
    update,
    tags,
    proposalType,
    categories,
    missingCategories,
    allTags,
    title,
    proposalType,
    
  } = props;

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
};

export default SessionProposal;
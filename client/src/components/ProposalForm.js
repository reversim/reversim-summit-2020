import React from 'react';
import FormField, { SPACING } from './FormField';
import { PROPOSAL_TYPES_ARR } from '../data/proposals';

export const getProposalData = (e) => {
  const formElements = e.target.elements;

  const title = formElements.title.value;
  const proposalType = this.state.proposalType;
  const abstract = formElements.abstract.value;
  const outline = formElements.outline.value;
  const video_url = formElements.video_url.value;
  const tags = this.state.tags.map(tag => tag.text);

  return {
    name        : fullname,
    bio         : bio,
    trackRecord : trackRecord,
    linkedin    : linkedin,
    twitter     : twitter,
    github      : github,
    oneLiner    : oneLiner,
    phone       : phone
  };
};

const TitleFieldCaption = () => (
  <span>Make it descriptive, concise, and appealing. You are welcome to review <a href="http://summit2016.reversim.com/#schedule" target="_blank" rel="noopener noreferrer">last year’s agenda</a>, or use the following examples:<br/><br/>
            <ul><li><i>“How we optimized micro-service utilization using machine learning”</i></li>
<li><i>“Writing on sand? Embracing CI-CD techniques in the HR team”</i></li>
<li><i>“Effective Hackathon: How to re-write a project in 24 hours and save your startup”</i></li>
              <li><i>“Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”</i></li></ul>
Reversim Summit is about deep-tech, and we will reject trivial introductory talks in software-related sessions (introduction to other topics is OK).
            </span>
);

const ProposalForm = () => (
  <div>
    <h4 className="mb-0">Public information</h4>
    <p className="font-size-sm text-gray-600">The following information will be presented in the website</p>
    <FormField id="title" label="Title" required={true} placeholder="Title of your talk" maxLength="100" className={SPACING} subtitle={<TitleFieldCaption/>}/>
    <FormField id="proposalType" inputType="radio" required={true} onChange={this.handleProposalTypeChange} values={PROPOSAL_TYPES_ARR} value={proposalType}/>
    <FormField id="abstract" label="Abstract" required={true} multiline={true} placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`} subtitle={<span>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.<br/><br/><b>Example:</b><br/>Building an effective micro-service architecture is a non-trivial task. At example.com, we have accumulated more than 500 different micro-services over the years, ended up with a micro-service spaghetti, long latency, and inevitably -  a broken CI/CD pipeline.
Then, we decided to remove human factor out of the equation.
In this session I will present our open-sourced package that analyzed our microservice architecture as a graph, measured the load on each server, improved server utilization by 73% and brought our CI-CD pipeline back from the dead.<br/><br/><span className={cn({'text-red': abstractErr})}>{abstractLen}/{ABSTRACT_MAX}</span></span>} fullRow={true} caption={null} onChange={this.onChangeAbstract}/>
    <Tags
      tags={tags}
      predefinedSuggestions={predefinedTags}
      suggestions={tagSuggestions}
      handleAddition={this.onAddTag}
      handleDelete={this.onDeleteTag}
      readOnly={this.state.tags.length===2} />

    <Modal isOpen={!!newTagPending} toggle={() => { this.setState({ newTagPending: null })}}>
      <div className="text-center">
        <h6>'{newTagPending}' doesn't exist</h6>
        <p>Before adding a new tag, please check if there's already an existing tag like this one.</p>
        { bestMatch ? <p>Did you mean <b>{bestMatch}</b>?</p> : undefined }
        <div>
          { bestMatch && <Button size="sm" onClick={(e) => { e.preventDefault(); this.addTag(bestMatch); this.setState({ newTagPending:null }); }}>Add <b>{bestMatch}</b></Button> }
          <Button outline size="sm" onClick={(e) => { e.preventDefault(); this.addTag(newTagPending); this.setState({ newTagPending:null }); }}>Add <b>{newTagPending}</b></Button>
        </div>
      </div>
    </Modal>

    <h6>Private information</h6>
    <small>The following information will be available <b>only to the organizing committee</b></small>
    <FormField id="video_url" label="Link to video" required={true} placeholder="e.g. http://youtu.be/xxxx" subtitle={<span><b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.<br/><b>New speakers</b>: A short video introducing you and the planned session outline. Example can be found <a href="https://www.youtube.com/watch?v=2A6cLeXLLII" target="_blank" rel="noopener noreferrer">in this video</a>.</span>} caption={null}/>
    <FormField id="outline" label="Outline" required={true} multiline={true} placeholder="" subtitle={<span>The outline should include the main subjects you intend to cover with a timing estimation and total timing. A general overview is fine, we don’t expect a per-slide description for now. <br/><br/><b>For example:</b><br/>
      &bull; 2m Introduction: Who am I and my professional background<br/>
      &bull; 5m Architectural overview: how we built 500 different micro-services over 5 years, and why we ended up supporting 15 different programming languages.<br/>
      &bull; 5m The latency math behind a micro-service call-chain, and why we had to over-provision containers to avoid a 1s response time because accumulated latency is not a normal distribution<br/>
      &bull; 15m Our solution: Measuring everything and using a managed machine-learning platform to optimize our response time and server utilization<br/>
      &bull; 5m: The open source power! How can you use our code to optimize your production system<br/>
      &bull; 5m Q&A<br/>
Total time: 37m</span>} fullRow={true} caption={null}/>
  </div>
);

export default ProposalForm;
import React, { Component } from 'react';
import { findBestMatch } from 'string-similarity';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ga from 'react-ga';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import cn from 'classnames';
import { titleInput } from './CFPPage.css';
import FormField, { SPACING } from './FormField';
import Tags from './Tags';
import { navigateTo } from '../utils';
import UserForm, { getUserData } from './UserForm';
import {
  ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR, PREDEFINED_TAGS,
  PROPOSAL_TYPES_ARR,
} from '../data/proposals';

const TitleFieldCaption = () => (
  <span>Make it descriptive, concise, and appealing. You are welcome to review <a href="http://summit2016.reversim.com/#schedule" target="_blank" rel="noopener noreferrer">last year’s agenda</a>, or use the following examples:<br/><br/>
            <ul><li><i>“How we optimized micro-service utilization using machine learning”</i></li>
<li><i>“Writing on sand? Embracing CI-CD techniques in the HR team”</i></li>
<li><i>“Effective Hackathon: How to re-write a project in 24 hours and save your startup”</i></li>
              <li><i>“Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”</i></li></ul>
Reversim Summit is about deep-tech, and we will reject trivial introductory talks in software-related sessions (introduction to other topics is OK).
            </span>
);

const AbstractFieldCaption = ({ abstractLen, abstractErr }) => (
  <span>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.<br/><br/><b>Example:</b><br/>Building an effective micro-service architecture is a non-trivial task. At example.com, we have accumulated more than 500 different micro-services over the years, ended up with a micro-service spaghetti, long latency, and inevitably -  a broken CI/CD pipeline.
Then, we decided to remove human factor out of the equation.
In this session I will present our open-sourced package that analyzed our microservice architecture as a graph, measured the load on each server, improved server utilization by 73% and brought our CI-CD pipeline back from the dead.<br/><br/><span className={cn({'text-red': abstractErr})}>{abstractLen}/{ABSTRACT_MAX}</span></span>
);

const VideoUrlFieldCaption = () => (
  <span><b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.<br/><b>New speakers</b>: A short video introducing you and the planned session outline.</span>
);

const OutlineFieldCaption = () => (
  <span>The outline should include the main subjects you intend to cover with a timing estimation and total timing. A general overview is fine, we don’t expect a per-slide description for now. <br/><br/><b>For example:</b><br/>
    &bull; 2m Introduction: Who am I and my professional background<br/>
    &bull; 5m Architectural overview: how we built 500 different micro-services over 5 years, and why we ended up supporting 15 different programming languages.<br/>
    &bull; 5m The latency math behind a micro-service call-chain, and why we had to over-provision containers to avoid a 1s response time because accumulated latency is not a normal distribution<br/>
    &bull; 15m Our solution: Measuring everything and using a managed machine-learning platform to optimize our response time and server utilization<br/>
    &bull; 5m: The open source power! How can you use our code to optimize your production system<br/>
    &bull; 5m Q&A<br/>
Total time: 37m</span>
);


class CFPForm extends Component {

  state = {
    proposalType: 'full',
    abstractLen: 0,
    abstractErr: true,
    tags: [],
    newTagPending: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    const { user, updateUserData, createProposal } = this.props;

    if (user) {
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y = formElements.abstract.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      try {
        await updateUserData(getUserData(e));
        const result = await createProposal(this.getProposalData(e));
        navigateTo(`/session/${result.id}`);
      } catch(ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true
        });
      }
    }
  };

  getProposalData = (e) => {
    const formElements = e.target.elements;
    const title = formElements.title.value;
    const proposalType = this.state.proposalType;
    const outline = formElements.outline.value;
    const video_url = formElements.video_url.value;
    const tags = this.state.tags.map(tag => tag.text);
    const user = this.props.user;

    return {
      title,
      proposalType,
      outline,
      video_url,
      tags,
      speaker_ids: [user._id],
    };
  };

  handleProposalTypeChange = (e) => {
    this.setState({ proposalType: e.target.value });
  };

  onChangeAbstract = (e) => {
    const val = e.target.value;
    const abstractLen = val.length;
    const abstractErr = val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;
    this.setState({
      abstractLen,
      abstractErr
    });
  };

  onAddTag = (tag) => {
    const { allTags } = this.props;
    console.log('onaddTag', tag, allTags, PREDEFINED_TAGS);
    if (this.state.tags.map(t => t.text).indexOf(tag) > -1) {
      return;
    } else if ((allTags && allTags.indexOf(tag) === -1) && PREDEFINED_TAGS.indexOf(tag) === -1) {
      this.setState({ newTagPending: tag });
    } else {
      this.addTag(tag);
    }
  };

  addTag = (tag) => {
    let tags = this.state.tags;
    tags.push({
      id: tag,
      text: tag
    });
    this.setState({tags: tags});
  };

  onDeleteTag = (i) => {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  };

  toggleTagModal = () => {
    this.setState({ newTagPending: null });
  };


  render() {
    const { user, allTags } = this.props;
    const { tags, proposalType, abstractErr, abstractLen, newTagPending } = this.state;
    let bestMatch, predefinedTags, tagStrs = this.state.tags.map(t => t.text);

    let tagSuggestions = allTags || [];
    tagSuggestions = uniq(without(PREDEFINED_TAGS.concat(tagSuggestions), ...tagStrs));
    predefinedTags = without(PREDEFINED_TAGS, ...tagStrs);

    if (newTagPending) {
      bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
    }

    return (
      <div className="mb-6">
        <h2>Submission</h2>
        <p>You may submit up to 3 proposals.</p>
        <p>Call for paper ends: <strong>{CFP_ENDS_STR}</strong>. No kidding.</p>
        <form onSubmit={this.handleSubmit} >
          <h3 className="mb-0">About you</h3>
          <p className="text-gray-600">Tell us about yourself</p>
          <UserForm user={user} />
          <h3 className="mb-0">Session proposal</h3>
          <p className="text-gray-600">Tell us about your session</p>
          <h4 className="mb-0">Public information</h4>
          <p className="font-size-sm text-gray-600">The following information will be presented in the website</p>
          <FormField id="title" label="Title" required={true} placeholder="Title of your talk" maxLength="100" className={cn(SPACING, titleInput)} subtitle={<TitleFieldCaption/>} />
          <FormField id="proposalType" inputType="radio" required={true} onChange={this.handleProposalTypeChange} values={PROPOSAL_TYPES_ARR} value={proposalType} className={SPACING} />
          <FormField id="abstract" label="Abstract" required={true} multiline={true} placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`} subtitle={<AbstractFieldCaption abstractLen={abstractLen} abstractErr={abstractErr} />} onChange={this.onChangeAbstract} className={SPACING} />
          <Tags
            tags={tags}
            suggestions={tagSuggestions}
            predefinedSuggestions={predefinedTags}
            handleAddition={this.onAddTag}
            handleDelete={this.onDeleteTag}
            readOnly={this.state.tags.length===2}
            className={SPACING} />

          <Modal isOpen={!!newTagPending} toggle={this.toggleTagModal}>
            <ModalHeader toggle={this.toggleTagModal}>'{newTagPending}' doesn't exist</ModalHeader>
            <ModalBody>
              <p>Before adding a new tag, please check if there's already an existing tag like this one.</p>
              { bestMatch && <p>Did you mean <b>{bestMatch}</b>?</p> }
            </ModalBody>
            <ModalFooter>
              { bestMatch && <Button size="sm" color="primary" onClick={(e) => { e.preventDefault(); this.addTag(bestMatch); this.setState({ newTagPending:null }); }}>Add <b>{bestMatch}</b></Button> }
              <Button outline color="primary" size="sm" onClick={(e) => { e.preventDefault(); this.addTag(newTagPending); this.setState({ newTagPending:null }); }}>Add <b>{newTagPending}</b></Button>
            </ModalFooter>
          </Modal>

          <h4 className="mb-0">Private information</h4>
          <p className="font-size-sm text-gray-600">The following information will be available <b>only to the organizing committee</b></p>
          <FormField id="video_url" label="Link to video" required={true} placeholder="e.g. http://youtu.be/xxxx" subtitle={<VideoUrlFieldCaption />} className={SPACING} />
          <FormField id="outline" label="Outline" required={true} multiline={true} placeholder="" subtitle={<OutlineFieldCaption />} className={SPACING} />

          <div className="text-center">
            <Input type="submit" className="d-none"/>
            <Button color="primary" className="mr-4" style={{ width: 120 }}>Submit</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CFPForm;
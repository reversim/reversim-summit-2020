import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import ga from 'react-ga';
import UserForm, {getUserData} from './UserForm.js';
import {ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR} from '../../data/proposals';
import ProposalForm from './ProposalForm.js';

import StepZilla from 'react-stepzilla';
import PublicInfo from './CFPForm/PublicInfo';
import ShortBio from './CFPForm/ShortBio';
import PrivateInfo from './CFPForm/PrivateInfo';
import SessionProposal from './CFPForm/SessionProposal';
import Abstract from './CFPForm/Abstract';
import Outline from './CFPForm/Outline';

import './prog-track.scss'

//styled-components section
const DeadLine = styled.strong`
  ${({ theme: { color } }) => `
    color: ${color.important};
  `};
`;

//React components section
class CFPForm extends Component {
  state = {
    proposalType: 'full',
    tags: [],
    categories: [],
    missingCategories:false
  };

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y =
          formElements.abstract.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      const categories = this.state.categories;
      if (!categories.length) {
        this.setState({missingCategories: true})
        const y =
          formElements.categories_hidden.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          750;
        window.scrollTo(0, y);
        return;
      }

      try {
        let newUser = getUserData(e.target.elements);
        newUser._id = user._id;
        await updateUserData(newUser);
        const result = await createProposal(this.getProposalData(formElements));
        history.push(`/session/${result._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  getProposalData = formElements => {
    const title = formElements.title.value;
    const type = this.state.proposalType;
    const outline = formElements.outline.value;
    const abstract = formElements.abstract.value;
    const legal = formElements.legal.checked;
    const tags = this.state.tags;
    const categories = this.state.categories;
    const user = this.props.user;
    const coSpeaker = formElements.coSpeaker.value;

    return {
      title,
      type,
      abstract,
      outline,
      tags,
      categories,
      legal,
      speaker_ids: [user._id],
      coSpeaker,
    }
  };

  updateState = state => this.setState(state);

  render() {
    const {user, allTags} = this.props;
    const {tags, proposalType, categories} = this.state;

    const steps = [
      { name: '1: Public Info', component: <PublicInfo user={user} />},
      { name: '2: Short Bio', component: <ShortBio user={user} />},
      { name: '3: Private Info', component: <PrivateInfo user={user} />},
      { name: '4: Session proposal', component: <SessionProposal update={this.updateState} tags={tags} proposalType={proposalType} categories={categories} missingCategories={this.state.missingCategories} allTags={allTags}/>},
      { name: '5: Abstract', component: <Abstract update={this.updateState} tags={tags} proposalType={proposalType} categories={categories} missingCategories={this.state.missingCategories} allTags={allTags} />},
      { name: '6: Outline', component: <Outline user={user} updateUserData={this.props.updateUserData} createProposal={this.props.createProposal} history={this.props.history} />},
    ];

    return (
      <Fragment>
      <div className="mb-6">
        <h2>Submission</h2>
        <p>Dear {user.name}, just a reminder.. you may submit up to 3 proposals.</p>
        <p>Call for paper ends: <DeadLine>{CFP_ENDS_STR}</DeadLine>. No kidding.</p>
        <div className='step-progress'>
          <StepZilla
            preventEnterSubmission={true}
            steps={steps}
          />
        </div>
      </div>
      </Fragment>
    );
  }
}

export default CFPForm;

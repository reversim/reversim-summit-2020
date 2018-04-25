import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import ga from 'react-ga';
import UserForm, { getUserData } from './UserForm';
import { ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR } from '../data/proposals';
import ProposalForm from './ProposalForm';


class CFPForm extends Component {

  state = {
    proposalType: 'full',
    tags: [],
    categories: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    const { user, updateUserData, createProposal, history } = this.props;

    if (user) {
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y = formElements.abstract.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      const categories = this.state.categories;
      if (!categories.length) {
        const y = formElements.categories_hidden.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 750;
        window.scrollTo(0, y);
        return;
      }

      try {
        await updateUserData(getUserData(formElements));
        const result = await createProposal(this.getProposalData(formElements));
        history.push(`/session/${result._id}`);
      } catch(ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true
        });
      }
    }
  };

  getProposalData = (formElements) => {
    const title = formElements.title.value;
    const type = this.state.proposalType;
    const outline = formElements.outline.value;
    const abstract = formElements.abstract.value;
    const legal = formElements.legal.checked;
    const tags = this.state.tags;
    const categories = this.state.categories;
    const user = this.props.user;

    return {
      title,
      type,
      abstract,
      outline,
      tags,
      categories,
      legal,
      speaker_ids: [user._id],
    };
  };

  updateState = state => this.setState(state);

  render() {
    const { user, allTags } = this.props;
    const { tags, proposalType, categories } = this.state;

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
          <ProposalForm
            update={this.updateState}
            tags={tags}
            proposalType={proposalType}
            categories={categories}
            allTags={allTags}
          />
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
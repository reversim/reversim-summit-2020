import React, {Component} from 'react';
import {Button, Input} from 'reactstrap';
import ga from 'react-ga';
import UserForm, {getUserData} from './UserForm';
import {ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR} from '../data/proposals';
import ProposalForm from './ProposalForm';

class CFPForm extends Component {
  state = {
    proposalType: 'full',
    tags: [],
    categories: [],
    missingCategories: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
        /* NOTE: this.handleSubmit() is dependent on formElements. 
       Assgin it a value corresponding to this.state and make sure it's keys are called accordingly. Tried it, didn't work as planned */
    //NOTE: used to be: const {abstract, categories} = this.state;
    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      // IMPOTANT: The following logic IS part of the function but should be modified
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y =
          formElements.abstract.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      } /* NOTE: Scroll to Abstract if abstract.length is bigger than Max or smaller than Min*/

      const categories = this.state.categories;
      if (!categories.length) {
        this.setState({missingCategories: true})
        const y =
          formElements.categories_hidden.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          750;
        window.scrollTo(0, y);
        return;
      } /* NOTE: Scroll to Categories if there's no abstract.categories.length*/

      try {
        let newUser = getUserData(e.target.elements); /* NOTE: creates a newUser object with info passed from the form */
        newUser._id = user._id;
        await updateUserData(newUser);
        /* NOTE: the above puts the newUser obj to the '/api/user' URL. updateUserData is a prop passed by App.js which
         imports updateUser(user) from /client/src/data-service.js */

        const result = await createProposal(this.getProposalData(formElements));
        /* NOTE: createProposal POSTs the object stored in this.state.proposal to /api/proposal.
           NOTE: the returned promise is assinged to the const result */

        history.push(`/session/${result._id}/?submited=true`); /* NOTE: redirects to the new session's page */
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
      coSpeaker
    }
  };

  updateState = state => this.setState(state);

  render() {
    const {user, allTags} = this.props;
    const {tags, proposalType, categories} = this.state;
    return (
      <div className="mb-6">
        <h2>Submission</h2>
        <p>You may submit up to 3 proposals.</p>
        <p>
          Call for paper ends: <strong>{CFP_ENDS_STR}</strong>. No kidding.
        </p>
        <form onSubmit={this.handleSubmit}>
          {/*hide if user had already submitted personal speaker data*/}
          <div hidden={!!user.video_url}>
            <h3 className="mb-0">About you</h3>
            <p className="text-gray-600">Tell us about yourself</p>
            <UserForm user={user} />
          </div>
          <h3 className="mb-0">Session proposal</h3>
          <p className="text-gray-600">Tell us about your session</p>
          <ProposalForm
            update={this.updateState}
            tags={tags}
            proposalType={proposalType}
            categories={categories}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
          />
          <div className="text-center">
            <Input type="submit" className="d-none" />
            <Button color="primary" className="mr-4" style={{width: 120}}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CFPForm;

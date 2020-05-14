import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import ga from 'react-ga';
import {getHref} from '../../utils';
import SessionProposal from '../CFP/CFPForm/SessionProposal';
import Abstract from '../CFP/CFPForm/Abstract';
import Outline from '../CFP/CFPForm/Outline';

//React components section

const PROPOSAL = 'currentProposal';

class EditProposalForm extends Component {
  constructor(props) {
    super(props);


          /*
          NOTE: props passed from SessionEditPage:

          <EditProposalForm
            update={this.updateState}
            tags={tags}
            proposalType={proposalType}
            categories={categories}
            allTags={allTags}
            title={title}
            outline={outline}
            abstract={abstract}
            legal={legal}
            coSpeaker={coSpeaker}
          />

          */
    const proposal = {
      title: props.title,
      type: props.proposalType,
      ossilProject: props.ossilProject,
      speaker: props.speaker,
      // coSpeaker: props.coSpeaker.email, //NOTE: this might need renaming
      abstract: props.abstract,
      tags: props.tags,
      categories: props.categories,
      outline: props.outline,
      iAgree: false,
    };

    this.CURRENT_PROPOSAL_KEY = `${PROPOSAL}@${this.props.speaker._id}`;

    const localCurrentProposal = JSON.parse(localStorage.getItem(this.CURRENT_PROPOSAL_KEY));

    this.state = {
      [PROPOSAL]: _.assign({}, proposal, localCurrentProposal),
    };
  }

  setValue = (form, field, value) => {
    const currentRelevantForm = _.get(this.state, form);
    const currentRelevantValue = _.get(this.state, [form, field]);

    const updatedRelevantForm = _.isArray(currentRelevantValue)
      ? _.assign({}, currentRelevantForm, {[field]: [...currentRelevantValue, value]})
      : _.assign({}, currentRelevantForm, {[field]: value});

    this.setState(
      {
        [form]: updatedRelevantForm,
      },
      () => {
        localStorage.setItem(
          this.CURRENT_PROPOSAL_KEY,
          JSON.stringify(this.state.currentProposal)
        );
      },
    );
  };

  setValueDebounced = _.debounce(this.setValue, 250);

  setProposalValueDebounced = _.partial(this.setValueDebounced, PROPOSAL);

  setProposalValue = _.partial(this.setValue, PROPOSAL);

  removeProposalTag = indexToRemove => {
    const proposalTags = this.state.currentProposal.tags;
    _.remove(proposalTags, tag => tag === proposalTags[indexToRemove]);

    const proposal = this.state.currentProposal;
    proposal.tags = proposalTags;

    localStorage.setItem(this.CURRENT_PROPOSAL_KEY, JSON.stringify(proposal));
    this.setState({ [PROPOSAL]: proposal });
  };

  removeCategory = value => {
    const currentProposal = this.state.currentProposal;
    const categories = currentProposal.categories;
    const updatedCategories = categories.filter(item => item !== value);

    const updatedProposal = _.assign({}, currentProposal, {categories: updatedCategories});

    localStorage.setItem(this.CURRENT_PROPOSAL_KEY, JSON.stringify(updatedProposal));
    this.setState({ [PROPOSAL]: updatedProposal });
  };

  getLocalForm = form => JSON.parse(localStorage.getItem(form));

  handleSubmit = async e => {
    e.preventDefault();


    const {currentProposal} = this.state;
    const {history, updateProposal, session} = this.props;

    if (currentProposal.iAgree === true) {
      try {
        await updateProposal(session._id, currentProposal);
        history.push(`/session/${getHref(session)}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  render() {
    const {allTags} = this.props;

    const {currentProposal} = this.state;
    const {
      currentProposal: {
        title,
        type,
        ossilProject,
        coSpeaker,
        abstract,
        tags,
        categories,
        outline,
        iAgree,
      }
    } = this.state ;

    return (
      <Fragment>
        <SessionProposal
          proposal={currentProposal}
          title={title}
          type={type}
          ossilProject={ossilProject}
          coSpeaker={coSpeaker}
          setValue={this.setProposalValue}
          setValueDebounced={this.setProposalValueDebounced}
        />
        <Abstract
          abstract={abstract}
          tags={tags}
          categories={categories}
          allTags={allTags}
          setValueDebounced={this.setProposalValueDebounced}
          setValue={this.setProposalValue}
          removeProposalTag={this.removeProposalTag}
          removeCategory={this.removeCategory}
        />
        <Outline
          proposal={currentProposal}
          outline={outline}
          iAgree={iAgree}
          history={this.props.history}
          setValueDebounced={this.setProposalValueDebounced}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
};

export default EditProposalForm;

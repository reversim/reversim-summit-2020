import React, {Component} from 'react';
import styled from 'styled-components';
import ga from 'react-ga';
import {debounce} from 'lodash';
import {getUserData} from './UserForm.js';
import {ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR} from '../../data/proposals';

import StepZilla from 'react-stepzilla';
import PublicInfo from './CFPForm/PublicInfo';
import ShortBio from './CFPForm/ShortBio';
import PrivateInfo from './CFPForm/PrivateInfo';
import SessionProposal from './CFPForm/SessionProposal';
import Abstract from './CFPForm/Abstract';
import Outline from './CFPForm/Outline';

import {
  AlignCenterColumn,
  HeadingAligner,
  Heading2,
  BreakLineMain,
  Paragraph2,
} from '../GlobalStyledComponents/ReversimStyledComps';

import './prog-track.scss';

//styled-components section
const NoteContainer = styled.div`
  width: 100%;
`;

const DeadLine = styled.span`
  ${({ theme: { color } }) => `
    color: ${color.important};
  `};
`;

//React components section
class CFPForm extends Component {
  constructor (props){
    super(props);
    this.state = {
      // proposalType: 'full',
      // tags: [],
      // categories: [], NOTE: commented out but it's still in use. DELETE WHEN DONE
      missingCategories: false,
      publicInfo: {
        name: '',
        OneLiner: '',
      },
      media: {
        LinkedIn: '',
        gitHub: '',
        twitter: '',
      },
      shortBio: {
        userBio: '',
      },
      privateInfo: {
        email: '',
        phoneNumber: '',
        linkToVideo: '',
        speakerTrackRecord: '',
      },
      sessionProposal: {
        title: '',
        type: '',
        coSpeaker: '',
      },
      abstract: {
        proposalAbstract: '',
        tags: [],
        categories: [],
      },
      outline: {
        propsalOutline: '',
      },
    };
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
    /*this.handleSubmit() is dependent on formElements. 
    Assgin it a value corresponding to this.state and make sure it's keys are called accordingly*/

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

      const categories = this.state.abstract.categories;
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
// handleSubmit was (and maybe should be) passed to a <form onSubmit={this.handleSubmit}> that wrapps <StepZilla />
// Done what I suggested above but it doesn't work. still returnd "cant read "
  getProposalData = formElements => {
    const title = formElements.title.value;
    const type = this.state.sessionProposal.type;
    const outline = formElements.outline.value;
    const abstract = formElements.abstract.value;
    const legal = formElements.legal.checked;
    const tags = this.state.abstract.tags;
    const categories = this.state.abstract.categories;
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
// getProposalData is passed to handleSubmit
  updateState = state => this.setState(state);

  render() {
    const {user, allTags} = this.props;
    const { abstract: { tags, categories }, sessionProposal: { proposalType }} = this.state;

    const steps = [
      {
        name: 'Public Info',
        component: <PublicInfo user={user} />
      },
      {
        name: 'Short Bio',
        component: <ShortBio user={user} />
      },
      {
        name: 'Private Info',
        component: <PrivateInfo user={user} />
      },
      {
        name: 'Session Proposal',
        component: (
          <SessionProposal
            update={this.updateState}
            tags={tags}
            proposalType={proposalType}
            categories={categories}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
          />
        )
      },
      {
        name: 'Abstract',
        component: (
          <Abstract
            update={this.updateState}
            tags={tags}
            proposalType={proposalType}
            categories={categories}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
          />
        )
      },
      {
        name: 'Outline & Notes',
        component: (
          <Outline
            user={user}
            updateUserData={this.props.updateUserData}
            createProposal={this.props.createProposal}
            history={this.props.history}
          />
        )
      },
    ];

    return (
      <AlignCenterColumn>
        <HeadingAligner>
          <Heading2>Submission</Heading2>
          <BreakLineMain />
        </HeadingAligner>
        <NoteContainer>
          <Paragraph2>Dear {user.name}, happy to see you're submitting session proposals! :)</Paragraph2>
          <Paragraph2>Remember, you may submit up to 3 proposals.</Paragraph2>
          <Paragraph2>Call for paper ends: <DeadLine>{CFP_ENDS_STR}</DeadLine>. No kidding.</Paragraph2>
        </NoteContainer>
        <div className='step-progress pl-5 pr-7'>
          <form onSubmit={this.handleSubmit}>
            <StepZilla
              preventEnterSubmission={true}
              steps={steps}
            />
          </form>
        </div>
      </AlignCenterColumn>
    );
  }
}

export default CFPForm;

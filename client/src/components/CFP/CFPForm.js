import React, {Component} from 'react';
import styled from 'styled-components';
import ga from 'react-ga';
import _ from 'lodash';
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
  constructor(props) {
    super(props);
    this.state = {
      missingCategories: false,
      userInfo: {
        fullname: '',
        email: '',
        twitter: '',
        gitHub: '',
        linkedin: '',
        trackRecord: '',
        phone: '',
        bio: '',
        oneLiner: '',
        video_url: '',
      },
      proposal: {
        title: '',
        type: '',
        abstract: '',
        tags: [],
        categories: [],
        coSpeaker: '',
        outline: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setValue = _.debounce((form, key, value) => {
    const currentRelevantForm = _.get(this.state, form)
    const updatedRelevantForm = _.assign({}, currentRelevantForm, { [key]: value })
    
    this.setState({
      [form]: updatedRelevantForm,
    });
  }, 1000);

  setProposalTag = newTag => {
    const proposalTags = this.state.proposal.tags;
    const newProposalTags = [...proposalTags, newTag];

    const proposal = this.state.proposal;
    proposal.tags = newProposalTags;

    this.setState({proposal});
  };

  removeProposalTag = indexToRemove => {
    const proposalTags = this.state.proposal.tags;
    _.remove(proposalTags, tag => tag === proposalTags[indexToRemove]);

    const proposal = this.state.proposal;
    proposal.tags = proposalTags;

    this.setState({proposal});
  };

  handleSubmit = async e => {
    e.preventDefault();
    // const formElements = e.target.element;
    /* NOTE: this.handleSubmit() is dependent on formElements. 
       Assgin it a value corresponding to this.state and make sure it's keys are called accordingly. Tried it, didn't work as planned */
    //NOTE: used to be: const {abstract, categories} = this.state;
    const {userInfo, proposal} = this.state;
    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      // IMPOTANT: The following logic IS part of the function but should be modified
      // if (proposal.abstract.length > ABSTRACT_MAX || proposal.abstract.length < ABSTRACT_MIN) {
      //   const scrollY =
      //     proposal.abstract.getBoundingClientRect().top -
      //     document.body.getBoundingClientRect().top -
      //     150;
      //   window.scrollTo(0, scrollY);
      //   proposal.abstract.focus();
      //   return;
      // } /* NOTE: Scroll to Abstract if abstract.length is bigger than Max or smaller than Min*/

      // if (!proposal.categories.length) {
      //   this.setState({missingCategories: true});
      //   const scrollY =
      //     proposal.categories_hidden.getBoundingClientRect().top -
      //     document.body.getBoundingClientRect().top -
      //     750;
      //   window.scrollTo(0, scrollY);
      //   return;
      // } /* NOTE: Scroll to Categories if there's no abstract.categories.length*/

      try {
        // let newUser = getUserData(e.target.elements); /* NOTE: creates a newUser object with info passed from the form */
        userInfo._id = user._id;
        await updateUserData(userInfo);
        /* NOTE: the above puts the newUser obj to the '/api/user' URL. updateUserData is a prop passed by App.js which
        imports updateUser(user) from /client/src/data-service.js */

        const result = await createProposal(proposal);
        /* NOTE: createProposal POSTs the object stored in this.state.proposal to /api/proposal.
           NOTE: the returned promise is assinged to the const result */

        history.push(`/session/${result._id}`); /* NOTE: redirects to the new session's page */
        console.log(userInfo);
        console.log(proposal);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };
  /* NOTE: handleSubmit was (and maybe should be) passed to a <form onSubmit={this.handleSubmit}> that wrapps <StepZilla />
     NOTE: Done what I suggested above but it doesn't work. still formElements is not defined */

  render() {
    const {user, allTags} = this.props;
    const {tags, categories, type} = this.state.proposal;

    const steps = [
      {
        name: 'Public Info',
        component: <PublicInfo user={user} setValue={this.setValue} />
      },
      {
        name: 'Short Bio',
        component: <ShortBio user={user} setValue={this.setValue} />
      },
      {
        name: 'Private Info',
        component: <PrivateInfo user={user} setValue={this.setValue} />
      },
      {
        name: 'Session Proposal',
        component: <SessionProposal proposalType={type} setValue={this.setValue} />
      },
      {
        name: 'Abstract',
        component: (
          <Abstract
            categories={categories}
            tags={tags}
            abstract={this.state.proposal.abstract}
            type={type}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
            setValue={this.setValue}
            setProposalTag={this.setProposalTag}
            removeProposalTag={this.removeProposalTag}
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
            setValue={this.setValue}
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
            <StepZilla
              preventEnterSubmission={true}
              steps={steps}
            />
        </div>
      </AlignCenterColumn>
    );
  }
}

export default CFPForm;

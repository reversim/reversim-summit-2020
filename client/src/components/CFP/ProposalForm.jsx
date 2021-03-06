import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import StepZilla from 'react-stepzilla';
import ga from 'react-ga';

import PublicInfo from './CFPForm/PublicInfo';
import ShortBio from './CFPForm/ShortBio';
import PrivateInfo from './CFPForm/PrivateInfo';
import SessionProposal from './CFPForm/SessionProposal';
import Abstract from './CFPForm/Abstract';
import Outline from './CFPForm/Outline';

import {CFP_ENDS_STR} from '../../data/proposals';
import {
  AlignCenterColumn,
  HeadingAligner,
  Heading2,
  BreakLineMain,
  Paragraph2,
} from '../GlobalStyledComponents/ReversimStyledComps';

//styled-components section

const NoteContainer = styled.div`
  width: 100%;
`;

const CFPparagraph = styled(Paragraph2)`
${({ theme: { font } }) => `
font-size: ${font.size_md};
`};
`;

const DeadLine = styled.span`
  ${({ theme: { color, font } }) => `
    color: ${color.important};
    font-size: ${font.size_h5};
  `};
`;

const FormContainer = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    margin-top: calc(2 * ${space.xxl});
  `};
`;


//React components section

const USER_INFO = 'userInfo';
const PROPOSAL = 'currentProposal';

class ProposalForm extends Component {
  constructor(props) {
    super(props);

    const userInfo = {
      name: this.props.user.name,
      oneLiner: null,
      affiliation: '',
      linkedin: '',
      github: '',
      twitter: '',
      bio: '',
      email: this.props.user.email,
      phone: '',
      video_url: '',
      trackRecord: '',
      _id: [this.props.user._id],
    };

    const proposal = {
      title: '',
      type: '',
      ossilProject: '',
      coSpeaker: '',
      abstract: '',
      tags: [],
      categories: [],
      outline: '',
      speaker_ids: [this.props.user._id],
      iAgree: false,
    };

    this.USER_INFO_KEY = `${USER_INFO}@${this.props.user._id}`;
    this.CURRENT_PROPOSAL_KEY = `${PROPOSAL}@${this.props.user._id}`;

    const localUserInfo = JSON.parse(localStorage.getItem(this.USER_INFO_KEY));
    const localCurrentProposal = JSON.parse(localStorage.getItem(this.CURRENT_PROPOSAL_KEY));

    this.state = {
      [USER_INFO]: _.assign({}, userInfo, localUserInfo),
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
        console.log('%c sending state to local storage', 'background:gold; color: purple;', this.state);

        form === USER_INFO
          ? localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(this.state.userInfo))
          : localStorage.setItem(
              this.CURRENT_PROPOSAL_KEY,
              JSON.stringify(this.state.currentProposal)
            );
      },
    );
  };

  setValueDebounced = _.debounce(this.setValue, 250);

  setUserInfoValueDebounced = _.partial(this.setValueDebounced, USER_INFO);

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

    const {userInfo, currentProposal} = this.state;
    const {updateUserData, createProposal, history} = this.props;

    if (currentProposal.iAgree === true) {
      try {
        await updateUserData(userInfo);
        const result = await createProposal(currentProposal);
        result && localStorage.removeItem(this.CURRENT_PROPOSAL_KEY);

        history.push(`/session/${result._id}`);
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

    const {userInfo, currentProposal} = this.state;
    const {
      userInfo:{
        name,
        oneLiner,
        affiliation,
        linkedin,
        github,
        twitter,
        bio,
        email,
        phone,
        video_url,
        trackRecord
      },
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

    const steps = [
      {
        name: 'Public Info',
        component: (
          <PublicInfo
          name={name}
          oneLiner={oneLiner}
          affiliation={affiliation}
          linkedin={linkedin}
          github={github}
          twitter={twitter}
          setValueDebounced={this.setUserInfoValueDebounced} />
        ),
      },
      {
        name: 'Short Bio',
        component: <ShortBio bio={bio} setValueDebounced={this.setUserInfoValueDebounced} />,
      },
      {
        name: 'Private Info',
        component: (
          <PrivateInfo user={userInfo}
          email={email}
          phone={phone}
          videoUrl={video_url}
          trackRecord={trackRecord}
          setValueDebounced={this.setUserInfoValueDebounced} />
        ),
      },
      {
        name: 'Session Proposal',
        component: (
          <SessionProposal
            proposal={currentProposal}
            title={title}
            type={type}
            ossilProject={ossilProject}
            coSpeaker={coSpeaker}
            setValue={this.setProposalValue}
            setValueDebounced={this.setProposalValueDebounced}
          />
        )
      },
      {
        name: 'Abstract',
        component: (
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
        )
      },
      {
        name: 'Outline & Notes',
        component: (
          <Outline
            proposal={currentProposal}
            outline={outline}
            iAgree={iAgree}
            updateUserData={this.props.updateUserData}
            createProposal={this.props.createProposal}
            history={this.props.history}
            setValueDebounced={this.setProposalValueDebounced}
            handleSubmit={this.handleSubmit}
          />
        )
      },
    ];

    return (
      <FormContainer>
        <HeadingAligner>
          <Heading2>Add a Session Proposal</Heading2>
          <BreakLineMain />
        </HeadingAligner>
        <NoteContainer>
          <CFPparagraph>Dear {userInfo.name}, happy to see you're submitting session proposals! :)</CFPparagraph>
          <CFPparagraph>Remember, you may submit up to 3 proposals.</CFPparagraph>
          <CFPparagraph>Call for paper ends: <DeadLine>{CFP_ENDS_STR}</DeadLine>. No kidding.</CFPparagraph>
        </NoteContainer>
        <StepZilla
          preventEnterSubmission={true}
          steps={steps}
        />
      </FormContainer>
    );
  }
};

export default ProposalForm;

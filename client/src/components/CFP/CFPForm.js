import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import StepZilla from 'react-stepzilla';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import ga from 'react-ga';
<<<<<<< HEAD
import {CFP_ENDS_STR} from '../../data/proposals';
=======
import {getUserData} from './UserForm.js';
>>>>>>> Moved the CFPForm to /cfp/form

import Page from '../Page';
import PublicInfo from './CFPForm/PublicInfo';
import ShortBio from './CFPForm/ShortBio';
import PrivateInfo from './CFPForm/PrivateInfo';
import SessionProposal from './CFPForm/SessionProposal';
import Abstract from './CFPForm/Abstract';
import Outline from './CFPForm/Outline';

import {getUserProposals} from '../../../src/data-service';
import {CFP_ENDS_STR} from '../../data/proposals';
import {getLoginUrl} from '../Redirect';
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

const FormContainer = styled(AlignCenterColumn)`
${({ theme: { space } }) => `
  margin-top: calc(2 * ${space.xxl});
`};
`;

const USER_INFO = 'userInfo';
const PROPOSAL = 'currentProposal';

//React components section

const SubmissionClosed = () => (
  <h6>
    Call for papers is closed for submission. You can view the submitted proposals{' '}
    <Link to="proposals">here</Link>.
  </h6>
);

const NonAuthenticated = () => (
  <div className="text-center mb-6">
    <h6>Login with Google is required in order to submit a proposal</h6>
    <a href={getLoginUrl()}>
      <Button outline color="primary">
        Login
      </Button>
    </a>
  </div>
);

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
    };

    const proposal = {
      title: '',
      proposalType: '',
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
      missingCategories: false,
      [USER_INFO]: _.assign({}, userInfo, localUserInfo),
      [PROPOSAL]: _.assign({}, proposal, localCurrentProposal),
    };

    console.log('UserInfo @constructor', this.state[USER_INFO]); //DELETE WHEN DONE
    console.log('proposal: @constructor', this.state[PROPOSAL]); //DELETE WHEN DONE
    console.log('user: @constructor', this.props.user); //DELETE WHEN DONE

    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
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
    this.setState(
      {
         [PROPOSAL]: proposal
      }, () => {
      console.log('%c state after removeProposalTags ', 'background:gold; color: purple;', this.state); // DELETE WHEN DONE
    });
  };

  removeCategory = value => {
    const currentProposal = this.state.currentProposal;
    const categories = currentProposal.categories;
    const updatedCategories = categories.filter(item => item !== value);

    const updatedProposal = _.assign({}, currentProposal, {categories: updatedCategories});
    console.log('removeCategory called'); // DELETE WHEN DONE

    localStorage.setItem(this.CURRENT_PROPOSAL_KEY, JSON.stringify(updatedProposal));
    this.setState(
      {
        [PROPOSAL]: updatedProposal,
      },
      () => {
        console.log('%c value to remove: ', 'background: firebrick', value); // DELETE WHEN DONE
        console.log('current proposal: ', this.state.currentProposal); // DELETE WHEN DONE
        console.log('updated proposal: ', updatedProposal); // DELETE WHEN DONE
      },
    );
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
        result && localStorage.clear();

        history.push(`/session/${result._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  checkProposals = async () => {
    try {
      let response = await getUserProposals();
      // let JSONResponse = JSON.parse(response);
      console.log('Response is', response.proposals.length);
    } catch(error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.checkProposals()
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
        proposalType,
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
            proposalType={proposalType}
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
            missingCategories={this.state.missingCategories}
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
          <Heading2>Add your New Session Proposal</Heading2>
          <BreakLineMain />
        </HeadingAligner>
        <NoteContainer>
          <Paragraph2>Dear {userInfo.name}, happy to see you're submitting session proposals! :)</Paragraph2>
          <Paragraph2>Remember, you may submit up to 3 proposals.</Paragraph2>
          <Paragraph2>Call for paper ends: <DeadLine>{CFP_ENDS_STR}</DeadLine>. No kidding.</Paragraph2>
        </NoteContainer>
        <div className='step-progress pl-5 pr-7'>
            <StepZilla
              preventEnterSubmission={true}
              steps={steps}
            />
        </div>
      </FormContainer>
    );
  }
};

const CFPForm = ({features: {submission}, user, ...props}) => (
  <Page title="New Session Form" {...props}>
    {
      !submission 
        ? <SubmissionClosed />
        : !user 
          ? <NonAuthenticated />
          : <ProposalForm user={user} {...props} />
    } 
  </Page>
);


export default CFPForm;

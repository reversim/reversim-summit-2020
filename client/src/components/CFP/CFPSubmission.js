import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import Page from '../Page';
import ProposalForm from './ProposalForm';
import {getUserProposals} from '../../data-service';
import {MAX_PROPOSALS, CFP_ENDS_STR} from '../../data/proposals';
import {getLoginUrl} from '../Redirect';
import {
  LoadingPage,
  Heading4,
  ItalicLink,
  FullScreenBkg2,
  FullScreenBoundries,
  MarginedPageHeading,
} from '../GlobalStyledComponents/ReversimStyledComps';
import './prog-track.scss';

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

const ProposalsMaxedOut = props => {
  const {user, cfpEndDate} = props;

  const dateFormatted = date => {
    const dateElements = date.split('-')
    return `${dateElements[2]}/${dateElements[1]}/${dateElements[0]}`;
  };

  return (
    <FullScreenBkg2>
      <FullScreenBoundries>
        <Heading4>
          Hey {user.name}, you can submit up to {MAX_PROPOSALS} proposals.
        </Heading4>
        <MarginedPageHeading>It looks like you have maxed out!</MarginedPageHeading>
        <Heading4>
          You can update your proposals from <ItalicLink href="/profile">your profile</ItalicLink> {' '}
          until {dateFormatted(cfpEndDate)} or after our moderation team finished going over your proposal.
        </Heading4>
      </FullScreenBoundries>
    </FullScreenBkg2>
  );
 };

class CFPSubmission extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      hasProposalsMaxed: false,
    };
  };

  hasProposalsMaxed = async () => {
    let response;

    try {
      response = await getUserProposals();
    } catch(error) {
      console.log('hasProposalsMaxed error: ', error);
    }

    const result = !!response && _.size(response.proposals) < MAX_PROPOSALS ? false : true;
    this.setState({
      loading: false,
      hasProposalsMaxed: result,
    })
  };

  async componentDidMount() {
    this.hasProposalsMaxed();
  };

  render() {
    const {
      features: {submission},
      user,
      eventConfig: {
        cfpEndDate,
      },
      ...props
    } = this.props;

    const {loading} = this.state;
    
    return (
      <Page title="New Session Form" {...props}>
        {
          loading
          ?  <LoadingPage />
          :  !submission 
              ? <SubmissionClosed />
              : !user 
                ? <NonAuthenticated />
                : this.state.hasProposalsMaxed
                  ? <ProposalsMaxedOut user={user} cfpEndDate={cfpEndDate}/>
                  : <ProposalForm user={user} {...props} />
        } 
      </Page>
    );
  }
}

export default CFPSubmission;

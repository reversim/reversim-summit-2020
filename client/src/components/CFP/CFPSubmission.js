import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import size from 'lodash/size';

import Page from '../Page';
import ProposalForm from './ProposalForm';
import {getUserProposals} from '../../data-service';
import {MAX_PROPOSALS, CFP_ENDS_STR} from '../../data/proposals';
import {getLoginUrl} from '../Redirect';
import {
  LoadingPage,
  Heading4,
  ItalicLink,
  InvertedButtonStyledLink,
  FullScreenBoundries,
  MarginedPageHeading,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';
import './prog-track.scss';

//sytled-components section

const ErrorPageHeadingLink = styled(ItalicLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_h3};
  `};
  ${mediaQueryMin.l`
  ${({ theme: { font } }) =>`
    white-space: nowrap;
    font-size: ${font.size_h2};
  `}
`}
`;

const ErrorPageSubHeading = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.text_3};
    text-align: center;
  `};
`;

const ErrorPageLink = styled(ItalicLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_h4};
  `};
`;

//React components section

const SubmissionClosed = () => (
  <FullScreenBoundries>
    <MarginedPageHeading>
      Call for papers is closed for submission. You can view the submitted proposals{' '}
      <ErrorPageHeadingLink href="/proposals">here</ErrorPageHeadingLink>.
    </MarginedPageHeading>
  </FullScreenBoundries>
);

const NonAuthenticated = () => (
  <FullScreenBoundries>
    <MarginedPageHeading>Login with Google is required in order to submit a proposal</MarginedPageHeading>
    <InvertedButtonStyledLink href={getLoginUrl()}>
      Login
    </InvertedButtonStyledLink>
  </FullScreenBoundries>
);

const ProposalsMaxedOut = props => {
  const {user, cfpEndDate} = props;

  const dateFormatted = date => {
    const dateElements = date.split('-')
    return `${dateElements[2]}/${dateElements[1]}/${dateElements[0]}`;
  };

  return (
    <FullScreenBoundries>
      <ErrorPageSubHeading>
        Hey {user.name}, you can submit up to {MAX_PROPOSALS} proposals.
      </ErrorPageSubHeading>
      <MarginedPageHeading>It looks like you have maxed out!</MarginedPageHeading>
      <ErrorPageSubHeading>
        You can update your proposals from <ErrorPageLink href="/profile">your profile</ErrorPageLink> {' '}
        until {dateFormatted(cfpEndDate)} or after our moderation team finished going over your proposal.
      </ErrorPageSubHeading>
    </FullScreenBoundries>
  );
 };

class CFPSubmission extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasProposalsMaxed: null,
    };
  };

  hasProposalsMaxed = async () => {
    let response;

    try {
      response = await getUserProposals();
    } catch(error) {
      console.log('hasProposalsMaxed error: ', error);
    }

    const userProposals = response.proposals; // NOTE: [ true, false, true ]
    const deletedString = "status: 'deleted'";
    const wasDeleted = proposal => proposal.includes(deletedString) // NOTE: the iteration function returns boolean


    const activeProposals = userProposals.filter(proposal => !wasDeleted(proposal));

    const result = !!response && size(activeProposals) < MAX_PROPOSALS ? false : true;
    this.setState({
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

    const {hasProposalsMaxed} = this.state;

    const loading = !(hasProposalsMaxed !== null && user);

    return (
      <Page title="New Session Form" user={user} {...this.props}>
        {
          loading
          ?  <LoadingPage />
          :  !submission
              ? <SubmissionClosed />
              : !user
                ? <NonAuthenticated />
                : hasProposalsMaxed
                  ? <ProposalsMaxedOut user={user} cfpEndDate={cfpEndDate}/>
                  : <ProposalForm user={user} {...props} />
        }
      </Page>
    );
  }
}

export default CFPSubmission;

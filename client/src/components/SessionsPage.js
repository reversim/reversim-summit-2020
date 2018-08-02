import React from 'react';
import Page from './Page';
import values from 'lodash/values';
import {Container} from 'reactstrap';
import {getSessionTypeStr} from '../utils';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import Tag from './Tag';

const Session = props => {
  const {proposal, speakers} = props;
  const {_id, title, type, tags, abstract} = proposal;
  return (
    <Link className="bg-emph p-3 d-block unstyled-link mb-6" to={`/session/${getHref(proposal)}`}>
      <div className="mb-6">{speakers.map(speaker => speaker.name)}</div>
      <h4>{title}</h4>
      <div className="d-flex mb-6">
        <div className="mr-8 font-size-sm">{getSessionTypeStr(type)}</div>
        <div className="d-flex">{tags.map(Tag)}</div>
      </div>
      <div className="text-truncate font-size-sm">{abstract}</div>
    </Link>
  );
};

class SessionsPage extends React.Component {
  render() {
    const proposals = values(this.props.proposals);
    const {isSmallScreen, fetchComplete, users} = this.props;
    const showProposals = proposals.length || !fetchComplete;

    return (
      <Page title="Sessions" {...this.props}>
        <Container>
          <h1 className="text-center mt-6 mb-12">Sessions</h1>
          {showProposals ? (
            <div>
              {proposals.map(proposal => (
                <Session
                  isSmallScreen={isSmallScreen}
                  key={proposal._id}
                  proposal={proposal}
                  speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                />
              ))}
            </div>
          ) : (
            undefined
          )}
        </Container>
      </Page>
    );
  }
}

export default SessionsPage;

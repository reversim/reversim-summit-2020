import React from 'react';
import Page from './Page';
import {Container, Button} from 'reactstrap';
import {getHref, getSessionTypeStr} from '../utils';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import SessionPageRoute from './SessionPageRoute';
import SessionDayTime from './SessionDayTime';
import VoteButton from './VoteButton';
import Speaker from './Speaker2';

const SessionPage = props => {
  const {
    user,
    session,
    sessionSspeakers,
    attendProposal,
    eventConfig,
    match: {
      params: {id},
    },
  } = props;
  const {voting} = eventConfig;
  const {title, abstract, type, tags, outline, categories: _categories, attended} = session;
  const isAuthor = user && session.speaker_ids.includes(user._id);
  const isTeamMember = user && user.isReversimTeamMember;
  const canEdit = isAuthor || isTeamMember;

  return (
    <Page title={session.title} {...props} isSingleContent={true}>
      <Container className="mt-4">
        <div className="bg-emph p-5 mb-8">
          <div className="mb-4">
            <SessionDayTime id={id} />
          </div>
          <h3 className="font-weight-heavy">
            {title}
            {canEdit && (
              <Link className="unstyled-link" to={`/session/${getHref(session)}/edit`}>
                <Button color="primary" size="sm" className="ml-3">
                  <i className="fa fa-pencil" />
                </Button>
              </Link>
            )}
          </h3>
          <div className="d-flex mb-2">
            <div className="mr-8">{getSessionTypeStr(type)}</div>
            <div className="d-flex">{tags.map(Tag)}</div>
          </div>
          {voting ? (
            <VoteButton
              user={user}
              attended={attended}
              proposalId={id}
              attendProposal={attendProposal}
            />
          ) : (
            undefined
          )}
          <div className="font-size-sm">
            <ReactMarkdown source={abstract} />
          </div>
          {/* {categories && (
            <div>
              <h4>Categories</h4>
              <ul>
                {categories.map(cat => (
                  <li key={cat} className="mr-2">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          {outline && (
            <div>
              <h4>Outline</h4>
              <ReactMarkdown source={outline.replace(/\n/g, '<br/>\n')} />{' '}
              {/* consolidate line breaks */}
            </div>
          )}
        </div>
        <div className="mb-10">
          {sessionSspeakers.map(speaker => <Speaker key={speaker._id} speaker={speaker} />)}
        </div>
      </Container>
    </Page>
  );
};

export default SessionPageRoute(SessionPage);

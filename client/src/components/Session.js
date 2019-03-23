import React from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {getHref} from '../utils';
import {Button} from 'reactstrap';
// import Tag from './Tag';
// import SessionDayTime from './SessionDayTime';
import SessionInfo from './SessionInfo';
import VoteButton from './VoteButton';
import {key} from '../utils';
import {image} from '../images';

const Session = ({proposal, speakers, user, attendProposal, onTagClick, eventConfig}) => {
  const {_id, title, type, tags, abstract, attended} = proposal;
  return (
    <div className="session b-strong d-flex mb-12" style={{minHeight: 440}}>
      {speakers.map(speaker => (
        <div className="session__speaker d-flex flex-column" key={key()}>
          <div
            style={{backgroundImage: `url(${image(speaker.picture, 236, 236)})`}}
            className="session__speaker-picture"
          />
          <div className="d-flex flex-column bg-purple2 text-white p-4 flex-grow-1">
            <h5>{speaker.name}</h5>
            <p className="flex-grow-1">{speaker.oneLiner}</p>
            <Link className="unstyled-link font-weight-bold" to={`/speaker/${getHref(speaker)}`}>
              ABOUT THE SPEAKER >>
            </Link>
          </div>
        </div>
      ))}
      <div className="p-4 d-flex flex-column justify-content-between">
        <div className="content">
          <h4 className="mb-5"><a className="unstyled-link" href={`/session/${_id}`}>{title}</a></h4>
          <div className="mb-5">
          <SessionInfo session={proposal} onTagClick={onTagClick}/>
          </div>
          <ReactMarkdown className="mb-4 session__abstract" source={abstract} />
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <VoteButton
            user={user}
            attended={attended}
            proposalId={_id}
            attendProposal={attendProposal}
            eventConfig={eventConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default Session;

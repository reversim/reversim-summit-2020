import React from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {getHref} from '../utils';
import {Button} from 'reactstrap';
// import Tag from './Tag';
// import SessionDayTime from './SessionDayTime';
import SessionInfo from './SessionInfo';

const Session = ({proposal, speakers}) => {
  const {_id, title, type, tags, abstract} = proposal;
  return (
    <div className="b-strong d-flex mb-12" style={{minHeight: 440}}>
      {speakers.map(speaker => (
        <div className="session__speaker mr-1 d-flex flex-column">
          <div
            style={{backgroundImage: `url(${speaker.picture})`}}
            className="session__speaker-picture"
          />
          <div className="d-flex flex-column bg-purple2 text-white p-4 flex-grow-1">
            <h5>{speaker.name}</h5>
            <p className="flex-grow-1">{speaker.oneLiner}</p>
            <Link className="unstyled-link font-weight-heavy" to={`/speaker/${getHref(speaker)}`}>
              ABOUT THE SPEAKER >>
            </Link>
          </div>
        </div>
      ))}
      <div className="p-4 d-flex flex-column">
        <h4 className="mb-5">{title}</h4>
        <div className="mb-5">
          <SessionInfo session={proposal} />
        </div>
        <ReactMarkdown className="mb-4" source={abstract} />
        <div className="flex-grow-1 d-flex justify-content-end align-items-end">
          <Button className="styled-button mr-10">Not relevant to me</Button>
          <Button className="styled-button">Interested</Button>
        </div>
      </div>
    </div>
  );
};

export default Session;

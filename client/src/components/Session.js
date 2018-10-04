import React from 'react';
import {getSessionTypeStr} from '../utils';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import Tag from './Tag';
import SessionDayTime from './SessionDayTime';

const Session = props => {
  const {proposal, speakers} = props;
  const {_id, title, type, tags, abstract} = proposal;
  return (
    <Link className="bg-emph p-3 d-block unstyled-link mb-6" to={`/session/${getHref(proposal)}`}>
      <div className="d-flex justify-content-between">
        <div className="mb-4">{speakers.map(speaker => speaker.name).join(' && ')}</div>
        <div>
          <SessionDayTime id={_id} />
        </div>
      </div>
      <h4>{title}</h4>
      <div className="d-flex mb-4">
        <div className="mr-2 font-size-sm">{getSessionTypeStr(type)}</div>
        <div className="d-flex">{tags.map(Tag)}</div>
      </div>
      <div className="text-truncate font-size-sm">{abstract}</div>
    </Link>
  );
};

export default Session;

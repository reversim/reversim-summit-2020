import React from 'react';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {getSessionTypeStr} from '../utils';

export default function SessionInfo({session, size}) {
  return (
    <div className={cn({[`font-size-${size}`]: size})}>
      <FontAwesomeIcon icon={faClock} className="mr-2" />
      <span className="mr-4 font-weight-heavy">{getSessionTypeStr(session.type)}</span>
      {session.category && (
        <span className="text-indigo px-2 b-heavy font-weight-bold">{session.category}</span>
      )}
    </div>
  );
}

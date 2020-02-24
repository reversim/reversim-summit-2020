import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { getSessionTypeStr } from '../utils';
import halls from '../data/halls';

import cn from "classnames";

//styled-components components
const InfoContainer = styled.div`
  ${({ theme: { space } }) => `
  margin-buttom: ${space.xxl};

  display: flex;
  flex-direction: colum;
  align-items: flex-start;
  `}
`;



//React component
const SessionInfo = ({ session, onTagClick, location }) => (
  <div className={cn("mb-9")}>
    <div className={cn("d-flex flex-column align-items-start")}>

      <div>
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        <span className="mr-4 font-weight-bold w-max-content">
          {getSessionTypeStr(session.type)}
        </span>
      </div>
      
      {location &&
      <div>
        <span className="mr-4 font-weight-bold w-max-content">
          {`day ${location.day+1} ${location.time} at class ${halls[location.hall]}`}
        </span>
      </div>}

      <div className="mr-4 text-purple2 font-weight-bold d-flex flex-wrap">
        {session.tags.map(tag =>
          onTagClick ? (
            <div
              key={tag}
              className="b-regular px-1 w-max-content mr-4 my-1 cursor-pointer"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </div>
          ) : (
            <div key={tag} className="b-regular px-1 w-max-content mr-4 my-1">
              {tag}
            </div>
          )
        )}
      </div>
    </div>
    
    {session.category && (
      <span className="text-indigo px-2 b-heavy font-weight-bold">
        {session.category}
      </span>
    )}
  </div>
);


export default SessionInfo;

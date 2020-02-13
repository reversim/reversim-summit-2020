import React, { Fragment } from 'react';
import cn from 'classnames';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { getSessionTypeStr } from '../utils';
import halls from '../data/halls';
import mediaQueryMin from '../styles/MediaQueriesMixin';
import {
  Heading5,
} from './GlobalStyledComponents/ReversimStyledComps';

// styled-components section
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaQueryMin.m`
    align-items: flex-start;
  `}
`;

const SessionType = styled.div`
  ${({ theme: { color, space, font } }) => `
    color: ${color.text_2};
    font-weight: ${font.weight_bold};
    margin-right: ${space.xl}; 
  `}
`;

const TypeText = styled(Heading5)`
  ${({ theme: { space, font, color }}) => `
    display: inline;
    width: max-content;
    margin: 0 ${space.l};
    color: ${color.text_2};
    font-weight: ${font.weight_bold};
  `}
`;

// React components section
export default function SessionInfo({ session, size, onTagClick, location }) {
  return (
    <Fragment>
      <InfoContainer>
        <SessionType>
          <FontAwesomeIcon icon={faClock}/>
          <TypeText>
            {session.type}
          </TypeText>
        </SessionType>
        {/*STOPPED HERE */}
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
      </InfoContainer>
      {session.category && (
        <span className="text-indigo px-2 b-heavy font-weight-bold">
          {session.category}
        </span>
      )}
    </Fragment>
  );
}

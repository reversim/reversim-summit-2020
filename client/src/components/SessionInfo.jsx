import React, { Fragment } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { getSessionTypeStr } from '../utils';
import halls from '../data/halls';
import mediaQueryMin from '../styles/MediaQueriesMixin';
import { Heading5 } from './GlobalStyledComponents/ReversimStyledComps';

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

const ClockIcon = styled(FontAwesomeIcon)`
  ${({ theme: { space } }) => `
    margin-right: ${space.l};
  `}
`;

const InfoText = styled(Heading5)`
  ${({ theme: { font, color }}) => `
    display: inline;
    width: max-content;
    color: ${color.text_2};
    font-weight: ${font.weight_bold};
  `}
`;

  const TagsContainer = styled.div`
  ${({ theme: { color, font } }) => `
    display: flex;
    flex-wrap: wrap;
    color: ${color.text_3};
    font-weight: ${font.weight_bold};
  `}
`;

const RegularTag = styled.div`
  ${({ theme: { color, space } }) => `
    border: 2px solid ${color.border_1};
    padding: 0 ${space.s};
    margin: ${space.s} calc(2*${space.m}) ${space.s} 0;
    cursor: pointer;
  `}
`;

const ClickTag = styled.div`
  ${({ theme: { color, space } }) => `
    border: 2px solid ${color.border_1};
    padding: 0 ${space.s};
    margin: ${space.s} calc(2*${space.m}) ${space.s} 0;
    cursor: pointer;
  `}
`;

const Category = styled.span`
  ${({ theme: { color, space, font } }) => `
    padding: 0 ${space.m};  
    color: ${color.session_category};
    font-weight: ${font.weight_bold};
    border: 2px solid ${color.session_category_border};
  `}
`;

// React components section
export default function SessionInfo({ session, onTagClick, location }) {
  return (
    <Fragment>
      <InfoContainer>
        <SessionType>
          <ClockIcon icon={faClock}/>
          <InfoText>
            {getSessionTypeStr(session.type)}
          </InfoText>
        </SessionType>
        {location && 
          <InfoText>
            {`Day ${location.day+1} | ${location.time} | ${halls[location.hall]}`}
          </InfoText>
        }
        <TagsContainer>
          {session.tags.map(tag =>
            onTagClick ? (
              <ClickTag key={tag} onClick={() => onTagClick(tag)}>{tag}</ClickTag>
            ) : (
              <RegularTag key={tag}>{tag}</RegularTag>
            )
          )}
        </TagsContainer>
        {session.category && (
          <Category>{session.category}</Category>
        )}
      </InfoContainer>
    </Fragment>
  );
}

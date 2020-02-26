import React, {Fragment} from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { getSessionTypeStr } from '../../utils';
import halls from '../../data/halls';
import mediaQueryMin from '../../styles/MediaQueriesMixin';
import { Heading5 } from '../GlobalStyledComponents/ReversimStyledComps';

//styled-components components
const InfoContainer = styled.div`
  ${({ theme: { space } }) =>`
    display: flex;
    flex-direction: column;
    margin-bottom: ${space.xl};
  `}  
  ${mediaQueryMin.m`
    align-items: flex-start;
  `}
`;

const SessionType = styled.div`
  ${({ theme: { color, font, space } }) => `
    margin-bottom: ${space.m}  
    color: ${color.text_2};
    font-weight: ${font.weight_bold};
  `}
  ${mediaQueryMin.l`
    ${({ theme: { font } }) => `
      height: calc(3 * ${font.size_h5})
    `}
  `}
  ${mediaQueryMin.xl`
    height: auto;
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

const LocationContainer = styled(InfoText)`
  width: 290px;
  ${mediaQueryMin.l`
    width: initial;
  `}
`;

  const TagsContainer = styled.div`
  ${({ theme: { space, color, font } }) => `
    margin-bottom: ${space.m};
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
    width: min-content;  
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
          <LocationContainer>
            {`Day ${location.day+1} | ${location.time} | ${halls[location.hall]}`}
          </LocationContainer>
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
        {
          session.categories && 
          session.categories.map(category =>  <Category key={category}>{category}</Category>)
        }
      </InfoContainer>
    </Fragment>
  );
}

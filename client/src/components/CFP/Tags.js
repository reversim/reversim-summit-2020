import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {Button} from 'reactstrap';
import styled from 'styled-components';

import './ReactTags.scss';
import { 
  InputLabel,
  FormSubHeading,
} from '../GlobalStyledComponents/ReversimStyledComps';
import {Bold} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

import {MAX_TAGS} from '../../data/proposals';

//styled-components components

const TagsContainer = styled.div`
  ${({ theme: { space } }) => `
    margin-bottom: calc(3 * ${space.m});
  `}
`;

const TagButtonsContainer = styled.div`
  ${({ theme: { space } }) => `
    margin-top: ${space.m};
  `}

  ${mediaQueryMin.m`
    margin-top: 0  
  `}
`;

const TagButton = styled(Button)`
  ${({ theme: { color, font, space } }) =>`
    height: 40px;
    margin: 0 ${space.m} ${space.xl} ${space.m};
    padding: 0 ${space.s};
    color: ${color.text_1};

    background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
    background-size: 205% 100%;
    border: solid 2px ${color.box_shadow_3};
    border-radius: 0;
    box-shadow: -2px 2px ${color.box_shadow_1}, -4px 4px ${color.box_shadow_3};

    font-size: ${font.size_sml};
    font-family: ${font.button};
    font-weight: ${font.weight_bold};
    text-align: center;
    text-decoration: none;

    transition: all .5s ease-out;

    &:hover{
      background-position: left bottom;
      text-decoration: none;
      color: ${color.text_1};
    }      
  `};
`;

const SuggestionsContainer = styled.div`
  ${({ theme: { space, color } }) => `
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    color: ${color.step_zilla_sub_heading};
    margin-top: ${space.m};
  `}
`;

const Tags = ({
  tags,
  suggestions,
  handleDelete,
  handleAddition,
  readOnly,
  predefinedSuggestions,
  onBlur
}) => (
  <TagsContainer>
    <InputLabel>Tags</InputLabel>
    <FormSubHeading>Maximum {MAX_TAGS} tags. Help us and your audience classify your session.</FormSubHeading>
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      readOnly={readOnly}
      minQueryLength={1}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      autofocus={false}
      onBlur={onBlur}
    />
    {!readOnly && (
      <SuggestionsContainer>
        <Bold>Suggestions:</Bold>{'\u00a0\u00a0'}{' '}
        <TagButtonsContainer>
          {predefinedSuggestions.map(suggestion => (
            <TagButton
              onClick={() => handleAddition(suggestion)}
              key={suggestion}
            >
              {suggestion}
            </TagButton>
          ))}
        </TagButtonsContainer>
      </SuggestionsContainer>
    )}
  </TagsContainer>
);

export default Tags;

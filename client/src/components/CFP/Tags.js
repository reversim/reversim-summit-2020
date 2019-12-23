import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import { 
  InputLabel,
  FormSubHeading,
} from '../GlobalStyledComponents/ReversimStyledComps';

import {Button} from 'reactstrap';
import styled from 'styled-components';
import {Bold} from '../GlobalStyledComponents/ReversimStyledComps';
import './ReactTags.css';

export const MAX_TAGS = 3;

//styled-components components

const TagsContainer = styled.div`
  ${({ theme: { space } }) => `
    margin-bottom: calc(3 * ${space.m});
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
      color: inherit;
    }      
  `};
`;

const SuggestionsContainer = styled.div`
  ${({ theme: { space, color } }) => `
    display: flex;
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
    />
    {!readOnly && (
      <SuggestionsContainer>
        <Bold>Suggestions:</Bold>{'\u00a0\u00a0'}{' '}
        {predefinedSuggestions.map(suggestion => (
          <TagButton
            onClick={() => handleAddition(suggestion)}
            key={suggestion}
          >
            {suggestion}
          </TagButton>
        ))}
      </SuggestionsContainer>
    )}
  </TagsContainer>
);

export default Tags;

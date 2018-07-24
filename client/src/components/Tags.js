import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {Button} from 'reactstrap';
import cn from 'classnames';
import {
  tags as tagsClass,
  tagInput,
  tagInputField,
  selected,
  tag,
  remove,
  suggestions as suggestionsClass,
  activeSuggestion,
} from './ReactTags.css';

export const MAX_TAGS = 3;

const classNames = {
  tags: tagsClass,
  tagInput,
  tagInputField: cn(tagInputField, 'form-control'),
  selected,
  tag,
  remove,
  suggestions: suggestionsClass,
  activeSuggestion,
};

const Tags = ({
  tags,
  suggestions,
  handleDelete,
  handleAddition,
  readOnly,
  predefinedSuggestions,
  className,
}) => (
  <div className={className}>
    <label>Tags</label>
    <small className="d-block text-muted mb-2">Maximum {MAX_TAGS} tags</small>
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      readOnly={readOnly}
      minQueryLength={1}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      autofocus={false}
      classNames={classNames}
    />
    {!readOnly && (
      <div className="mt-2">
        Suggestions:{'\u00a0\u00a0'}{' '}
        {predefinedSuggestions.map(suggestion => (
          <Button
            onClick={() => handleAddition(suggestion)}
            size="sm"
            color="link"
            className="text-underline"
            key={suggestion}>
            {suggestion}
          </Button>
        ))}
      </div>
    )}
  </div>
);

export default Tags;

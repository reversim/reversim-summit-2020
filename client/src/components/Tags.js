import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Button } from 'reactstrap';
import './ReactTags.css';

const classNames = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField form-control",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion",
};

const Tags = ({ tags, suggestions, handleDelete, handleAddition, readOnly, predefinedSuggestions, className }) => (
  <div className={className}>
    <label>Tags</label>
    <small className="d-block text-muted mb-2">Maximum 2 tags</small>
    <ReactTags tags={tags}
               suggestions={suggestions}
               readOnly={readOnly}
               minQueryLength={1}
               handleDelete={handleDelete}
               handleAddition={handleAddition}
               autofocus={false}
               classNames={classNames} />
    { !readOnly && <div className="mt-2">Suggestions:{'\u00a0\u00a0'} {predefinedSuggestions.map(suggestion => (
      <Button onClick={() => handleAddition(suggestion)} size="sm" color="link" className="text-underline">{suggestion}</Button>
    ))}</div> }
  </div>
);

export default Tags;
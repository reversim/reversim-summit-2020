import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const classNames = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion",
};

const Tags = ({ tags, suggestions, handleDelete, handleAddition, readOnly, predefinedSuggestions }) => (
  <div style={{marginBottom:30}}>
    <label>Tags</label><br/>
    <small>Maximum 2 tags</small>
    <ReactTags tags={tags}
               suggestions={suggestions}
               predefinedSuggestions={predefinedSuggestions}
               readOnly={readOnly}
               minQueryLength={1}
               handleDelete={handleDelete}
               handleAddition={handleAddition}
               autofocus={false}
               classNames={classNames} />
  </div>
);

export default Tags;
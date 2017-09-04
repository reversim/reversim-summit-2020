import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { cx } from 'css/styles';

const classNames = {
  tags: cx("ReactTags__tags"),
  tagInput: cx("ReactTags__tagInput"),
  tagInputField: cx("ReactTags__tagInputField"),
  selected: cx("ReactTags__selected"),
  tag: cx("ReactTags__tag"),
  remove: cx("ReactTags__remove"),
  suggestions: cx("ReactTags__suggestions"),
  activeSuggestion: cx("ReactTags__activeSuggestion"),
};

export default class Tags extends React.Component {
  render() {
    const { tags, suggestions, handleDelete, handleAddition, readOnly, predefinedSuggestions } = this.props;
    return (
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
    )
  }
}
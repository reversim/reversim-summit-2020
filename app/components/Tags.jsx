import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

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
                   autofocus={false}/>
      </div>
    )
  }
}
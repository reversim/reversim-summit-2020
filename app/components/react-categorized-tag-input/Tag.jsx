import React from 'react';

import classNames from 'classnames/bind';
import styles from './categorized-tag-input';
const cx = classNames.bind(styles);

const { PropTypes } = React;

const Tag = React.createClass({
  propTypes: {
    selected: PropTypes.bool,
    input: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    addable: PropTypes.bool,
    deletable: PropTypes.bool,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    style: PropTypes.object
  },

  // helps tests pass
  getDefaultProps() {
      return {
          text: ''
      };
  },

  tagContent() {
    let content = [];
    let startIndex = this.props.text.trim().toLowerCase()
      .indexOf(this.props.input.trim().toLowerCase());
    let endIndex = startIndex + this.props.input.length;

    if (startIndex > 0) {
      content.push(<span key={1} className={cx('cti__tag__content--regular')}>
        {this.props.text.substring(0, startIndex)}
      </span>);
    }

    content.push(<span key={2} className={cx('cti__tag__content--match')}>
      {this.props.text.substring(startIndex, endIndex)}
    </span>);

    if (endIndex < this.props.text.length) {
      content.push(<span key={3} className={cx('cti__tag__content--regular')}>
        {this.props.text.substring(endIndex)}
      </span>);
    }

    return content;
  },

  onClick(e) {
    e.preventDefault();
    if (this.props.addable) {
      this.props.onAdd(e);
    }
  },

  onDelete(e) {
    // Prevents onClick event of the whole tag from being triggered
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(e);
  },

  getDeleteBtn() {
    const style = this.props.style || {}
    const deleteStyle = style.delete ? style.delete : {}

    return (
      <span className={cx('cti__tag__delete')} onClick={this.onDelete}
        dangerouslySetInnerHTML={{ __html: '&times;' }}
        style={deleteStyle}/>
    );
  },

  render() {
    let deleteBtn = null;
    if (this.props.deletable) {
      deleteBtn = this.getDeleteBtn();
    }
    let cls = cx({'cti__tag': true, 'cti-selected' : this.props.selected});

    const style = this.props.style || {}

    return (
      <div className={cls} onClick={this.onClick} style={style.base || {}} >
        <div className={cx('cti__tag__content')} style={style.content || {}}>
          {this.tagContent()}
        </div>
        {deleteBtn}
      </div>
    );
  }
});

export default Tag;

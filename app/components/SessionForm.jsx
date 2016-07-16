import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import {updateProposal, fetchTags} from 'actions/proposals';
import ga from 'react-ga';
import features from 'features';
import TagInput from 'components/react-categorized-tag-input';

import styles from 'css/main';

const cx = classNames.bind(styles)

class SessionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proposalType: 'full',
      tags: []
    }
  }

  taggingEnabled() {
    const { user: { isReversimTeamMember } } = this.props;

    return features('tagging', false) && isReversimTeamMember;
  }

  componentWillMount() {
    const { dispatch, proposal: { type, tags } } = this.props;

    if (this.taggingEnabled()) {
      dispatch(fetchTags());
    }

    this.setState({ proposalType: type, tags: tags.map(tag => { return { category: 'Topics', title: tag } }) });
  }

  isSpeaker(userId) { // TODO: Duplicate, refactor
    const { proposal: { speaker_ids }, user: { id, authenticated } } = this.props;

    if (authenticated && userId) {
      return userId === id;
    } else if (authenticated && speaker_ids) {
      return speaker_ids.map(speaker => speaker._id).indexOf(id) > -1;
    } else {
      return false;
    }
  }

  handleProposalTypeChange(event) {
    this.setState({ proposalType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { dispatch, user: { authenticated, id, isReversimTeamMember }, proposal, onFinishEdit } = this.props;

    if (authenticated && (isReversimTeamMember || this.isSpeaker())) {
      const formElements = event.target.elements;

      const title = formElements.title.value;
      const proposalType = this.state.proposalType;
      const abstract = formElements.abstract.value;

      let updatedProposal = {
        title: title,
        type: proposalType,
        abstract: abstract
      };

      if (this.taggingEnabled()) {
        updatedProposal.tags = this.state.tags.map(tag => tag.title);
      }

      dispatch(updateProposal(proposal.id, updatedProposal))
      .then(() => {
        this.props.notificationSystem.addNotification({
          title: 'Proposal Updated!',
          level: 'success'
        });

        onFinishEdit(event);
      })
      .catch(e => ga.exception({
        description: `Error on editing session ${proposal.id} (${proposal.title}): ${e}`,
        fatal: true
      }));
    }
  }

  render() {
    const { allTags, proposal: { title, abstract, type, tags }, user: { id, isReversimTeamMember } } = this.props;

    let proposalType;
    if (type === 'ossil') {
      proposalType = "Open Source in Israel (10 min.)";
    } else if (type === 'lightning') {
      proposalType = "Lightning Talk (5 min.)";
    } else {
      proposalType = "Full Featured (30-40 min.)";
    }

    let categories = [ {
      id: 'topics',
      title: 'Topics',
      type: 'topic',
      items: allTags || []
    } ]

    let tagsInput;
    if (this.taggingEnabled()) {
      tagsInput =
        <fieldset>
          <span className={cx("col-xs-12")}>
            <label htmlFor="title">Tags</label>
          </span>
          <span className={cx("col-xs-12")}>
            <TagInput
              categories={categories}
              addNew={true}
              onChange={(tags) => this.setState({tags})}
              value={this.state.tags}
            />
          </span>
        </fieldset>
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
          <fieldset>
            <span className={cx("col-xs-12")}>
              <label htmlFor="title">Title</label>
            </span>
            <span className={cx("col-xs-12")}>
              <input id="title" ref="title" type="text" defaultValue={title} required />
            </span>
          </fieldset>

          {tagsInput}

          <fieldset>
            <span className={cx("col-xs-12")}>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "full"} value="full" /> <label htmlFor="full">Full Featured (30-40 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "lightning"} value="lightning" /> <label htmlFor="lightning">Lightning Talk (5 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "ossil"} value="ossil" /> <label htmlFor="ossil">Open Source in Israel (10 min.)</label></div>
            </span>
          </fieldset>

          <fieldset>
            <span className={cx("col-xs-12")}>
              <label htmlFor="abstract">Abstract</label>
            </span>
            <span className={cx("col-xs-12")}>
              <textarea id="abstract" ref="abstract" required defaultValue={abstract} />
            </span>
            <small className={cx("col-xs-8")}>Markdown syntax is supported</small>
          </fieldset>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <input type="submit" value="save" className={cx('btn', 'btn-sm')} />
          </fieldset>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.props.onCancel}>Cancel</button>
          </fieldset>
      </form>
    );
  }
}

SessionForm.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  proposal: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onFinishEdit: PropTypes.func.isRequired,
  allTags: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.user,
        allTags: state.proposal.tags
    }
}

export default connect(mapStateToProps)(SessionForm);

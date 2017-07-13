import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import {updateProposal, fetchTags} from 'actions/proposals';
import ga from 'react-ga';
import features from 'features';
import { findBestMatch } from 'string-similarity';
import Tags from 'components/Tags';
import Rodal from 'components/Rodal';
import _ from 'lodash';
import FormField from 'components/FormField';


import styles from 'css/main';

const cx = classNames.bind(styles);

const PREDEFINED_TAGS = [
  'Frontend',
  'Backend',
  'Mobile',
  'Infrastructure',
  'Product',
  'Culture'
];

const ABSTRACT_MAX=700;
const ABSTRACT_MIN=280;

class SessionForm extends Component {

  constructor(props) {
    super(props);

    const abstractLength = props.proposal.abstract.length;
    this.state = {
      proposalType: 'full',
      abstractLen: abstractLength,
      abstractErr: abstractLength < ABSTRACT_MIN || abstractLength > ABSTRACT_MAX,
      tags: (props.proposal.tags && props.proposal.tags.map(tag => ({ id: tag, text: tag }))) || []
    };

    this.onAddTag = this.onAddTag.bind(this);
    this.onDeleteTag = this.onDeleteTag.bind(this);
    this.onChangeAbstract = this.onChangeAbstract.bind(this);
  }

  componentWillMount() {
    const { dispatch, proposal: { type, tags } } = this.props;

    this.setState({ proposalType: type });

    dispatch(fetchTags());
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

  onChangeAbstract(e) {
    const val = e.target.value;
    const abstractLen = val.length;
    const abstractErr = val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;
    this.setState({
      abstractLen,
      abstractErr
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    const { dispatch, user: { authenticated, id, isReversimTeamMember }, proposal, onFinishEdit } = this.props;

    if (authenticated && (isReversimTeamMember || this.isSpeaker())) {
      const formElements = event.target.elements;

      const title = formElements.title.value;
      const proposalType = this.state.proposalType;
      const abstract = formElements.abstract.value;
      const outline = formElements.outline.value;
      const video_url = formElements.video_url.value;


      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y = formElements.abstract.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      let updatedProposal = {
        title,
        type: proposalType,
        abstract,
        outline,
        video_url
      };

      updatedProposal.tags = this.state.tags.map(tag => tag.text);

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

  onAddTag(tag) {
    const { tagSuggestions } = this.props;
    if (this.state.tags.map(t => t.text).indexOf(tag) > -1) {
      return;
    } else if ((tagSuggestions && tagSuggestions.indexOf(tag) === -1) && PREDEFINED_TAGS.indexOf(tag) === -1) {
      this.setState({ newTagPending: tag });
    } else {
      this.addTag(tag);
    }
  }

  addTag(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tag,
      text: tag
    });
    this.setState({tags: tags});
  }

  onDeleteTag(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }

  render() {
    const { proposal: { title, abstract, outline, video_url } } = this.props;
    let { tagSuggestions } = this.props;
    const { tags, newTagPending, abstractErr, abstractLen } = this.state;
    let bestMatch, predefinedTags, tagStrs = this.state.tags.map(t => t.text);
    tagSuggestions = tagSuggestions || [];
    tagSuggestions = _.uniq(_.without(PREDEFINED_TAGS.concat(tagSuggestions), ...tagStrs));
    predefinedTags = _.without(PREDEFINED_TAGS, ...tagStrs);

    if (newTagPending) {
      bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
          <fieldset className="row">
            <span className={cx("col-xs-12")}>
              <label htmlFor="title">Title</label>
            </span>
            <span className={cx("col-xs-12")}>
              <input id="title" ref="title" type="text" defaultValue={title} required />
            </span>
          </fieldset>

          <Tags
            tags={tags}
            predefinedSuggestions={predefinedTags}
            suggestions={tagSuggestions}
            handleAddition={this.onAddTag}
            handleDelete={this.onDeleteTag}
            readOnly={this.state.tags.length===2} />

          <fieldset className="row" style={{marginTop:40}}>
            <span className={cx("col-xs-12")}>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "full"} value="full" /> <label htmlFor="full">Full Featured (30-40 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "lightning"} value="lightning" /> <label htmlFor="lightning">Lightning Talk (5 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "ossil"} value="ossil" /> <label htmlFor="ossil">Open Source in Israel (10 min.)</label></div>
            </span>
          </fieldset>

        <FormField id="abstract" label="Abstract" value={abstract} required={true} multiline={true} placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`} subtitle={<span>Between {ABSTRACT_MIN}-{ABSTRACT_MAX} characters (the length of 2-5 tweets). Markdown syntax is supported.<br/><br/><span className={cx({'abstract-err': abstractErr})}>{abstractLen}/{ABSTRACT_MAX}</span></span>} fullRow={true} caption={null} onChange={this.onChangeAbstract}/>

        <FormField id="video_url" value={video_url} label="Link to video" required={true} placeholder="e.g. http://youtu.be/xxxx" subtitle={<span><b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.<br/><b>New speakers</b>: A short video introducing you and the planned session outline. Example can be found <a href="https://www.youtube.com/watch?v=2A6cLeXLLII" target="_blank">in this video</a>.</span>} caption={null}/>

        <div style={{marginTop:40}}>
          <FormField id="outline" value={outline} label="Outline" required={true} multiline={true} placeholder="" subtitle={<span>The outline should include the main subjects you intend to cover with a timing estimation and total timing. A general overview is fine, we don’t expect a per-slide description for now.<br/><br/></span>} fullRow={true} caption={null}/>
        </div>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <input type="submit" value="save" className={cx('btn', 'btn-sm')} />
          </fieldset>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.props.onCancel}>Cancel</button>
          </fieldset>

          <Rodal visible={!!newTagPending} onClose={() => { this.setState({ newTagPending: null })}}>
            <div style={{textAlign: 'center'}}>
              <h6 style={{marginTop:16}}>'{newTagPending}' doesn't exist</h6>
              <p>Before adding a new tag, please check if there's already an existing tag like this one.</p>
              { bestMatch ? <p>Did you mean <b>{bestMatch}</b>?</p> : undefined }
              <div style={{marginTop:24}}>
                { bestMatch ? <button style={{ textTransform: 'none', letterSpacing: 1, fontWeight:400}} className={cx('btn', 'btn-sm', 'btn-sm-center')} onClick={(e) => { e.preventDefault(); this.addTag(bestMatch); this.setState({ newTagPending:null }); }}>Add <b>{bestMatch}</b></button> : undefined }
                <button style={{ textTransform: 'none', letterSpacing: 1, fontWeight:400}} className={cx('btn', 'btn-outline-clr', 'btn-sm', 'btn-sm-center')} onClick={(e) => { e.preventDefault(); this.addTag(newTagPending); this.setState({ newTagPending:null }); }}>Add <b>{newTagPending}</b></button>
              </div>
            </div>
          </Rodal>
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
      tagSuggestions: state.proposal.tags
    }
}

export default connect(mapStateToProps)(SessionForm);

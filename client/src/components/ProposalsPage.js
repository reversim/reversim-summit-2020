import React from 'react';
import Page from './Page';
import cn from 'classnames';
import {Container} from 'reactstrap';
import Session from './Session';
import values from 'lodash/values';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter, faTimesCircle, faTimes} from '@fortawesome/free-solid-svg-icons';
import {img} from "./Speaker2.css";
import introBG from '../images/proposals-page-bg.png';

const TagFilter = ({text, isSelected, onClick}) => (
  <div
    className={cn('mr-4 mb-4 px-2 py-1 line-height-1 border font-weight-bold', {
      'border-indigo text-indigo': !isSelected,
      'bg-indigo text-white border-transparent': isSelected,
    })}>
    {text}
    {'\u00A0'}
    <FontAwesomeIcon
      icon={faTimesCircle}
      className="text-indigo align-top cursor-pointer"
      onClick={onClick}
    />
  </div>
);

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    tagInput: '',
  };

  componentDidMount() {
    this.addEvents();
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  addEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true),
    );
  }

  removeEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true),
    );
  }

  handleDocumentClick = e => {
    const input = this.input.current;
    if (input.contains(e.target) && input !== e.target) {
      return;
    }

    this.setState({tagInput: ''});
  };

  onTagClick = tag => {
    this.setState({tagInput: ''});
    this.props.onTagClick(tag);
  };

  render() {
    const {tags, tagFilters} = this.props;
    const {tagInput} = this.state;

    const suggestedTags =
      tagInput &&
      tags
        .filter(t => !tagFilters.includes(t.text))
        .filter(t => t.text.indexOf(tagInput) > -1)
        .slice(10);
    return (
      <div
        className="d-flex b-strong align-items-center p-relative mr-4"
        style={{width: 360}}
        ref={this.input}>
        <input
          placeholder="Search for tags..."
          className="box-shadow-none border-transparent p-1"
          style={{outline: 'none'}}
          onChange={e => this.setState({tagInput: e.target.value})}
          value={this.state.tagInput}
        />
        <FontAwesomeIcon icon={faFilter} className="mr-2 text-purple2" />
        {suggestedTags && (
          <div
            className="b-strong p-absolute bg-white"
            style={{top: 38, left: -4, right: -4, maxHeight: 360, overflow: 'auto'}}>
            {suggestedTags.map(tag => (
              <div
                key={tag.text}
                className="text-black font-weight-heavy p-1 border-bottom border-purple2 cursor-pointer"
                onClick={() => this.onTagClick(tag.text)}>
                {tag.str}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

class ProposalsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('ctor');
  }
  componentDidMount() {
    console.log('mount');
    if (!this.props.gotAllProposals) {
      this.props.getAllProposals();
    }
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  state = {
    tagFilters: [],
    myVotes: false,
  };

  onTagClick = tag => {
    this.setState(state => {
      const index = state.tagFilters.indexOf(tag);
      if (index > -1) {
        return {
          tagFilters: state.tagFilters.slice(0, index).concat(state.tagFilters.slice(index + 1)),
        };
      } else {
        return {tagFilters: state.tagFilters.concat(tag)};
      }
    });
  };

  render() {
    const proposals = values(this.props.proposals);
    const {allTags, users, gotAllProposals, user, attendProposal} = this.props;

    const {tagFilters, myVotes} = this.state;
    const showProposals = !!gotAllProposals;
    const tags = allTags
      .map(tag => {
        const count = proposals.filter(p => p.tags.includes(tag)).length;
        return {text: tag, str: `${tag} (${count})`, count};
      })
      .sort((a, b) => (a.count > b.count ? -1 : 1));
    const tagfilteredProposals = tagFilters.length
      ? proposals.filter(proposal => proposal.tags.some(tag => tagFilters.includes(tag)))
      : proposals;
    const filteredProposals = myVotes
      ? tagfilteredProposals.filter(proposal => proposal.attended !== undefined)
      : tagfilteredProposals;
    const sortedProposals = filteredProposals.sort(
      (a, b) => (b.attended !== undefined ? -1 : a.attended !== undefined ? 1 : 0),
    );
    const showCount = sortedProposals.length;

    return (
      <Page title="Proposals" {...this.props}>
        <div  className="navbar-margin pb-15 bg-purple2 text-white font-size-lm x-bg"
            style={{backgroundImage: `url('${introBG}')`}}>
            <Container>
                  <div className="d-flex flex-column pt-15 ">
                    <h3 className="font-size-xl mr-4 font-weight-regular">Be The Voice Of The Community</h3>
                    <h3 className="font-size-xxxl mr-4 font-weight-regular">Impact The Content</h3>
                  </div>
            </Container>
        </div>
        <div className="white-bg" style={{padding: '60px 0'}}>
          <Container>
              <div className="border-bottom border-purple2 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="d-flex align-items-center">
              <TagInput tags={tags} tagFilters={tagFilters} onTagClick={this.onTagClick} />
                  {tagFilters.length ? (
                      <div
                      className="font-weight-heavy border-bottom border-black cursor-pointer"
                      onClick={() => this.setState({tagFilters: []})}>
                      Clear all <FontAwesomeIcon icon={faTimes} />
                  </div>
                  ) : (
                      undefined
                  )}
              </div>
                  <div
                  className="cursor-pointer font-weight-heavy d-flex align-items-center"
                  onClick={() => this.setState(({myVotes}) => ({myVotes: !myVotes}))}>
              <div
                  className={cn('mr-2 b-strong', {'bg-purple2': this.state.myVotes})}
                  style={{width: 24, height: 24}}
                  />
                  Show only my votes
                  </div>
                  </div>
                  <div className="d-flex justify-content-start">
                      {tagFilters.map(tagStr => (
                          <TagFilter key={tagStr} text={tagStr} onClick={() => this.onTagClick(tagStr)} />
              ))}
      </div>
          </div>

          {showProposals ? (
              <React.Fragment>
              <div className="mb-12 font-weight-heavy">Showing {showCount} proposals</div>
              {sortedProposals.map(proposal => (
                  <Session
                  key={proposal._id}
                  proposal={proposal}
                  speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                  user={user}
                  attendProposal={attendProposal}
                  />
              ))}
          </React.Fragment>
          ) : (
            <span className="font-mono font-size-xl">...</span>
          )}
      </Container>
        </div>
      </Page>
    );
  }
}

export default ProposalsPage;

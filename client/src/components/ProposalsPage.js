import React from "react";
import Page from "./Page";
import cn from "classnames";
import { Container } from "reactstrap";
import Session from "./Session";
import values from "lodash/values";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faTimesCircle,
  faTimes,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { img, title } from "./Speaker2.css";
import introBG from "../images/proposals-page-bg.png";

const TagFilter = ({ text, isSelected, onClick }) => (
  <div
    className={cn("mr-4 mb-4 px-2 py-1 line-height-1 border font-weight-bold", {
      "border-indigo text-indigo": !isSelected,
      "bg-indigo text-white border-transparent": isSelected
    })}
  >
    {text}
    {"\u00A0"}
    <FontAwesomeIcon
      icon={faTimesCircle}
      className="text-indigo align-top cursor-pointer"
      onClick={onClick}
    />
  </div>
);

const SelectVotes = ({ text, toggleFilter, isBorder, selected }) => (
  <div
    className="not-relevant-filter cursor-pointer font-weight-bold d-flex align-items-center px-2 py-1"
    onClick={toggleFilter}
    style={isBorder ? { borderBottom: "solid 2px #5127ff" } : {}}
  >
    <div
      className={cn("mr-2 b-regular", { selected: selected })}
      style={{ minWidth: 24, height: 24 }}
    >
      <div />
    </div>
    <span> {text} </span>
  </div>
  // {/*<div className="d-flex flex-column" onClick={() => setValue(value)} style={isBorder ? {borderBottom:'solid 2px #5127ff'} : {}}>*/}
  //   {/*<div className="cursor-pointer font-weight-bold d-flex align-items-center px-2 py-1">*/}
  //     {/*<div className={cn("mr-2 b-regular")} style={{ width: 24, height: 24 }} />*/}
  //     {/*<span>{text}</span>*/}
  // </div>
  // </div>
);

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    tagInput: ""
  };

  componentDidMount() {
    this.addEvents();
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }

  removeEvents() {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }

  handleDocumentClick = e => {
    const input = this.input.current;
    if (input.contains(e.target) && input !== e.target) {
      return;
    }

    this.setState({ tagInput: "" });
  };

  onTagClick = tag => {
    this.setState({ tagInput: "" });
    this.props.onTagClick(tag);
  };

  render() {
    const { tags, tagFilters } = this.props;
    const { tagInput } = this.state;
    const width = this.props.isSmallerScreen ? 300 : 360;

    const suggestedTags =
      tagInput &&
      tags
        .filter(t => !tagFilters.includes(t.text))
        .filter(t => t.text.toLowerCase().indexOf(tagInput.toLowerCase()) > -1)
        .slice(0, 10);

    return (
      <div
        className="d-flex b-strong align-items-center p-relative mr-4"
        style={{ width }}
        ref={this.input}
      >
        <input
          placeholder="Search for tags..."
          className="box-shadow-none border-transparent p-1"
          style={{ outline: "none" }}
          onChange={e => this.setState({ tagInput: e.target.value })}
          value={this.state.tagInput}
        />
        <FontAwesomeIcon icon={faFilter} className="mr-2 text-purple2" />
        {tagInput && (
          <div
            className="b-strong p-absolute bg-white"
            style={{
              top: 38,
              left: -4,
              right: -4,
              maxHeight: 368,
              overflow: "auto",
              zIndex: 1
            }}
          >
            {suggestedTags.length > 0 ? (
              suggestedTags.map(tag => (
                <div
                  key={tag.text}
                  className="text-black font-weight-bold p-1 border-bottom border-purple2 cursor-pointer"
                  onClick={() => this.onTagClick(tag.text)}
                >
                  {tag.str}
                </div>
              ))
            ) : (
              <div className="text-black font-weight-bold p-1 cursor-pointer">
                No tags were found
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

class ProposalsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagFilters: [],
      myVotesOpen: false,
      myVotesClean: true,
      votesFilter: {
        interested: true,
        notRelevant: true,
        none: true
      }
    };
  }
  componentDidMount() {
    if (!this.props.gotAllProposals) {
      this.props.getAllProposals();
    }
  }

  onTagClick = tag => {
    tag = tag.toLowerCase()
    this.setState(state => {
      const index = state.tagFilters.indexOf(tag);
      if (index > -1) {
        return {
          tagFilters: state.tagFilters
            .slice(0, index)
            .concat(state.tagFilters.slice(index + 1))
        };
      } else {
        return { tagFilters: state.tagFilters.concat(tag) };
      }
    });
  };

  addTag = tag => {
    tag = tag.toLowerCase()
    this.setState(state => {
      const index = state.tagFilters.indexOf(tag);
      if (index > -1) {
        return {tagFilters: state.tagFilters}
      } else {
        return { tagFilters: state.tagFilters.concat(tag) };
      }
    });
  }


  toggleMyVotesInput = () => {
    this.setState({
      myVotesOpen: !this.state.myVotesOpen,
      myVotesClean: false
    });
  };

  render() {
    const proposals = values(this.props.proposals);
    const {
      allTags,
      users,
      gotAllProposals,
      user,
      attendProposal,
      eventConfig
    } = this.props;

    const { tagFilters } = this.state;
    const showProposals = !!gotAllProposals;
    const tags = allTags
      .map(tag => {
        const count = proposals.filter(p => p.tags.map(t=>t.toLowerCase()).includes(tag.toLowerCase())).length;
        return { text: tag, str: `${tag} (${count})`, count };
      })
      .sort((a, b) => (a.count > b.count ? -1 : 1));
    const tagfilteredProposals = tagFilters.length
      ? proposals.filter(proposal =>
          proposal.tags.some(tag => tagFilters.map(t=>t.toLowerCase()).includes(tag.toLowerCase()))
        )
      : proposals;

    let votesFilterText = [];
    let filteredProposals = [];

    if (this.state.votesFilter.none) {
      votesFilterText.push("None");
      filteredProposals.push(
        ...tagfilteredProposals.filter(
          proposal => proposal.attended === undefined
        )
      );
    }
    if (this.state.votesFilter.notRelevant) {
      votesFilterText.push("Not relevant");
      filteredProposals.push(
        ...tagfilteredProposals.filter(proposal => proposal.attended === false)
      );
    }
    if (this.state.votesFilter.interested) {
      votesFilterText.push("Interested");
      filteredProposals.push(
        ...tagfilteredProposals.filter(proposal => proposal.attended)
      );
    }
    const sortedProposals = filteredProposals.sort((a, b) =>
      b.attended !== undefined ? -1 : a.attended !== undefined ? 1 : 0
    );
    const showCount = sortedProposals.length;

    return (
      <Page title="Proposals" {...this.props}>
        <div
          className="navbar-margin pb-15 bg-purple2 text-white font-size-lm proposals-bg d-flex justify-content-center"
          style={{ backgroundImage: `url('${introBG}')` }}
        >
          {eventConfig.voting && <Container>
            <div className={cn("d-flex flex-column pt-15", title)}>
              <h3 className="font-size-xl mr-4 font-weight-regular">
                Be The Voice Of The Community
              </h3>
              <h3 className="font-size-xxxl mr-4 font-weight-regular">
                Impact The Content
              </h3>
            </div>
          </Container>}
        </div>
        <div className="white-bg" style={{ padding: "60px 0" }}>
          <Container>
            <div className="border-bottom border-purple2 mb-4">
              <div className="proposals-filters mb-5 align-items-start">
                <div className="d-flex align-items-center">
                  <TagInput
                    tags={tags}
                    tagFilters={tagFilters}
                    onTagClick={this.onTagClick}
                  />
                  {tagFilters.length ? (
                    <div
                      className="font-weight-bold border-bottom border-black cursor-pointer"
                      onClick={() => this.setState({ tagFilters: [] })}
                    >
                      Clear all <FontAwesomeIcon icon={faTimes} />
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
                <div className="d-flex flex-column">
                    <div
                      className="d-flex b-strong align-items-center p-relative cursor-pointer mr-4"
                      style={{ outline: "none" }}
                      ref={this.input}
                    >
                      <input
                        placeholder="Filter by voting status..."
                        className="box-shadow-none border-transparent p-1 cursor-pointer"
                        style={{ outline: "none" }}
                        value={votesFilterText.join(", ")}
                        onClick={this.toggleMyVotesInput}
                        onChange={() => {}}
                      />
                      <FontAwesomeIcon
                        icon={
                          this.state.myVotesOpen ? faChevronUp : faChevronDown
                        }
                        className="text-purple2 mr-2 align-top"
                      />
                    </div>
                    {this.state.myVotesOpen && (
                      <div
                        className="b-strong white-bg mr-4"
                        style={{ borderTop: "none" }}
                      >
                        <SelectVotes
                          text={"Interested"}
                          toggleFilter={() => {
                            let votesFilter = this.state.votesFilter;
                            votesFilter.interested = !votesFilter.interested;
                            this.setState(votesFilter);
                          }}
                          isBorder={true}
                          selected={this.state.votesFilter.interested}
                        />
                        <SelectVotes
                          text={"Not relevant to me"}
                          toggleFilter={() => {
                            let votesFilter = this.state.votesFilter;
                            votesFilter.notRelevant = !votesFilter.notRelevant;
                            this.setState(votesFilter);
                          }}
                          isBorder={true}
                          selected={this.state.votesFilter.notRelevant}
                        />
                        <SelectVotes
                          text={"None"}
                          toggleFilter={() => {
                            let votesFilter = this.state.votesFilter;
                            votesFilter.none = !votesFilter.none;
                            this.setState(votesFilter);
                          }}
                          selected={this.state.votesFilter.none}
                        />
                      </div>
                    )}
                </div>
              </div>
              <div className="d-flex justify-content-start">
                {tagFilters.map(tagStr => (
                  <TagFilter
                    key={tagStr}
                    text={tagStr}
                    onClick={() => this.onTagClick(tagStr)}
                  />
                ))}
              </div>
            </div>

            {showProposals ? (
              <React.Fragment>
                <div className="mb-8 mt-8 font-weight-heavy">
                  Showing {showCount} proposals
                </div>
                {sortedProposals.map(proposal => (
                  <Session
                    key={proposal._id}
                    proposal={proposal}
                    speakers={proposal.speaker_ids.map(
                      speakerId => users[speakerId]
                    )}
                    user={user}
                    attendProposal={attendProposal}
                    onTagClick={this.addTag}
                    eventConfig={eventConfig}
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

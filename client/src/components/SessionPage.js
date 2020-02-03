import React, { Component } from "react";
import cn from "classnames";
import Page from "./Page";
import {
  Container,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal
} from "reactstrap";
import { getHref, key } from "../utils";
import Tag from "./Tag";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import SessionPageRoute from "./SessionPageRoute";
import SessionDayTime from "./SessionDayTime";
import VoteButton from "./VoteButton";
import {image} from '../images';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import SessionInfo from "./SessionInfo";
library.add(faPencilAlt, faTrash);

class SessionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false
    };
  }
  askDelete = () => {
    this.setState({ isDelete: true });
    // await props.updateProposal(proposalId, {status:'deleted'});
  };
  toggleDeleteModal = () => {
    this.setState({ isDelete: false });
  };
  deleteProposal = async () => {
    this.setState({ isDelete: false });
    await this.props.updateProposal(getHref(this.props.session), {
      status: "deleted"
    });
    this.props.history.goBack(1);
  };

  render() {
    const {
      user,
      session,
      sessionSpeakers,
      attendProposal,
      eventConfig,
      match: {
        params: { id }
      }
    } = this.props;
    const { voting, cfp, moderationCompleted } = eventConfig;
    const {
      title,
      abstract,
      type,
      tags,
      outline,
      categories: _categories,
      attende,
      speaker_ids,
      attended
    } = session;
    const trackRecords = sessionSpeakers.map(speaker => ({
      name: speaker.name,
      trackRecord: speaker.trackRecord
    }));
    const video_urls = sessionSpeakers.map(speaker => ({
      name: speaker.name,
      video_url: speaker.video_url
    }));
    const isAuthor = user && session.speaker_ids.includes(user._id);
    const isTeamMember = user && user.isReversimTeamMember;
    // const editPeriod = cfp || moderationCompleted;
    // TODO: NETA- remove the always true
    const editPeriod = true;
    const canEdit = (isAuthor && editPeriod) || isTeamMember;
    const canSeeStatus = (isAuthor || isTeamMember) && moderationCompleted;

    return (
      <Page title={session.title} {...this.props} isSingleContent={true}>
        <div className="navbar-margin session-page__hero bg-purple2 pb-8">
          <Container>
            <h3 className="session-page__title mb-0 line-height-15 font-size-xxl text-white">
              {title}
            </h3>
          </Container>
        </div>
        <Container className="mt-4">
          <div className="mb-5">
            <SessionInfo session={session} size="md" />
            {/* <div className="d-flex">{tags.map(Tag)}</div> */}
            <div>
              <SessionDayTime id={id} />
            </div>
          </div>

          <div className="mb-2 d-flex align-items-center">
            {canSeeStatus && (
              <div className="text-purple2 font-weight-bold font-size-lm">
                Status:
                {session.status === "accepted" ? " Accepted" : " Sadly not this time"}
              </div>
            )}
            {canEdit && (
              <Link
                className="unstyled-link"
                to={`/session/${getHref(session)}/edit`}
              >
                <Button
                  size="sm"
                  className="ml-3 styled-button btn btn-secondary"
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                </Button>
              </Link>
            )}
          </div>

          <div className="font-size-md mb-12">
            <ReactMarkdown source={abstract} />
          </div>
          {outline && (
            <div className='text-break'>
              <h4>???</h4>
              <ReactMarkdown source={outline.replace(/\n/g, "<br/>\n")} />{" "}
              {/* consolidate line breaks */}
            </div>
          )}
          {isTeamMember &&
            trackRecords &&
            trackRecords.map((trackRecord, i) => (
              <div className="mb-3" key={i}>
                <h4>Track record- {trackRecord.name}</h4>
                <div className="font-size-sm">
                  <ReactMarkdown source={trackRecord.trackRecord} />
                </div>
              </div>
            ))}
          {isTeamMember &&
            video_urls &&
            video_urls.map((video_url, i) => (
              <div className="mb-3" key={i}>
                <h4>Video URL- {video_url.name}</h4>
                <div>
                  <a href={video_url.video_url} target="_blank">
                    {video_url.video_url}
                  </a>
                </div>
              </div>
            ))}

          <div className="session-page__voting mb-10">
            {voting && (
              <VoteButton
                user={user}
                attended={attended}
                proposalId={id}
                attendProposal={attendProposal}
                eventConfig={eventConfig}
              />
            )}
          </div>
          <div className="session-page__speakers">
            {sessionSpeakers.map(speaker => (
              <div
                className="b-strong session-page__speaker-box mb-8 d-flex"
                key={key()}
              >
                <div
                  className="session-page__speaker"
                  style={{ backgroundImage: `url('${image(speaker.picture, 236, 240)}')` }}
                />
                <div className="p-5 d-flex flex-column flex-grow-1">
                  <h4 className="font-weight-bold font-size-lg">
                    {speaker.name}
                  </h4>
                  <div className="flex-grow-1 d-flex justify-content-end align-items-end">
                    <Link
                      key={speaker._id}
                      to={`/speaker/${getHref(speaker)}`}
                      className="unstyled-link"
                    >
                      <Button className="styled-button mobile-height-auto">Read more</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*{canEdit && (*/}
          {/*  <Button*/}
          {/*    color="primary"*/}
          {/*    size="sm"*/}
          {/*    className="ml-3"*/}
          {/*    onClick={this.askDelete}*/}
          {/*  >*/}
          {/*    <FontAwesomeIcon icon="trash" />*/}
          {/*  </Button>*/}
          {/*)}*/}
        </Container>
        <Modal isOpen={!!this.state.isDelete} toggle={this.toggleDeleteModal}>
          <ModalBody>
            <p>are you sure you want to delete this proposal?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteProposal}>
              Yes, Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Page>
    );
  }
}

export default SessionPageRoute(SessionPage);

import React, {Component} from 'react';
import Page from './Page';
import {Container, Button, ModalHeader, ModalBody, ModalFooter, Modal} from 'reactstrap';
import {getHref, key} from '../utils';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import SessionPageRoute from './SessionPageRoute';
import SessionDayTime from './SessionDayTime';
import VoteButton from './VoteButton';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import SessionInfo from './SessionInfo';
library.add(faPencilAlt, faTrash);

class SessionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
    };
  }
  askDelete = () => {
    this.setState({isDelete: true});
    // await props.updateProposal(proposalId, {status:'deleted'});
  };
  toggleDeleteModal = () => {
    this.setState({isDelete: false});
  };
  deleteProposal = async () => {
    this.setState({isDelete: false});
    await this.props.updateProposal(getHref(this.props.session), {status: 'deleted'});
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
        params: {id},
      },
    } = this.props;
    const {voting} = eventConfig;
    const {title, abstract, type, tags, outline, categories: _categories, attended} = session;
    const isAuthor = user && session.speaker_ids.includes(user._id);
    const isTeamMember = user && user.isReversimTeamMember;
    const canEdit = isAuthor || isTeamMember;

    return (
      <Page title={session.title} {...this.props} isSingleContent={true}>
        <div className="session-page__hero bg-purple2 pb-8">
          <Container>
            <h3 className="mb-0 line-height-15 font-size-xxl text-white">{title}</h3>
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
          {canEdit && (
            <Link className="unstyled-link" to={`/session/${getHref(session)}/edit`}>
              <Button color="primary" size="sm" className="ml-3">
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
            </Link>
          )}
          <div className="mb-5">
            {voting ? (
              <VoteButton
                user={user}
                attended={attended}
                proposalId={id}
                attendProposal={attendProposal}
              />
            ) : (
              undefined
            )}
          </div>
          <div className="font-size-md mb-12">
            <ReactMarkdown source={abstract} />
          </div>
          {outline && (
            <div>
              <h4>Outline & private notes</h4>
              <ReactMarkdown source={outline.replace(/\n/g, '<br/>\n')} />{' '}
              {/* consolidate line breaks */}
            </div>
          )}
          <div>
            {sessionSpeakers.map(speaker => (
              <div className="b-strong d-flex" key={key()}>
                <div
                  className="session-page__speaker"
                  style={{backgroundImage: `url('${speaker.picture}')`}}
                />
                <div className="p-5 d-flex flex-column flex-grow-1">
                  <h4 className="font-weight-bold font-size-lg">{speaker.name}</h4>
                  <p>{speaker.oneLiner}</p>
                  <div className="flex-grow-1 d-flex justify-content-end align-items-end">
                    <Link
                      key={speaker._id}
                      to={`/speaker/${getHref(speaker)}`}
                      className="unstyled-link">
                      <Button className="styled-button">Read more</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {canEdit && (
            <Button color="primary" size="sm" className="ml-3" onClick={this.askDelete}>
              <FontAwesomeIcon icon="trash" />
            </Button>
          )}
        </Container>
        <Modal isOpen={!!this.state.isDelete} toggle={this.toggleDeleteModal}>
          <ModalBody>
            <p>are you sure you want to delete this proposal?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteProposal}>
              Yes, Delete
            </Button>{' '}
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

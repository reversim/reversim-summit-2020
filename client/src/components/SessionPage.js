import React, {Component} from 'react';
import Page from './Page';
import { Container, Button, ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import {getHref, getSessionTypeStr} from '../utils';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import SessionPageRoute from './SessionPageRoute';
import SessionDayTime from './SessionDayTime';
import VoteButton from './VoteButton';
import Speaker from './Speaker2';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { getLoginUrl } from "./Redirect";
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
    await this.props.updateProposal(getHref(this.props.session), {status:'deleted'});
    this.props.history.goBack(1)
  }

  render() {
    const {
      user,
      session,
      sessionSpeakers,
      attendProposal,
      eventConfig,
      match: {
        params: { id },
      },
    } = this.props;
    const { voting } = eventConfig;
    const { title, abstract, type, tags, outline, categories: _categories, attended } = session;
    const isAuthor = user && session.speaker_ids.includes(user._id);
    const isTeamMember = user && user.isReversimTeamMember;
    const canEdit = isAuthor || isTeamMember;

    return (
    <Page title={session.title} {...this.props} isSingleContent={true}>
      <Container className="mt-4">
        <div className="bg-emph p-5 mb-8">
          <div className="mb-4">
            <SessionDayTime id={id} />
          </div>
          <h3 className="font-weight-heavy">
            {title}
            {canEdit && (
              <Link className="unstyled-link" to={`/session/${getHref(session)}/edit`}>
                <Button color="primary" size="sm" className="ml-3">
                  <FontAwesomeIcon icon="pencil-alt"/>
                </Button>
              </Link>
            )}
            {canEdit && (
              <Button color="primary" size="sm" className="ml-3" onClick={this.askDelete}>
                <FontAwesomeIcon icon="trash"/>
              </Button>
            )}
          </h3>
          <div className="d-flex mb-2">
            <div className="mr-8">{getSessionTypeStr(type)}</div>
            <div className="d-flex">{tags.map(Tag)}</div>
          </div>
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
          <div className="font-size-sm">
            <ReactMarkdown source={abstract} />
          </div>
          {/* {categories && (
            <div>
              <h4>Categories</h4>
              <ul>
                {categories.map(cat => (
                  <li key={cat} className="mr-2">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          {outline && (
            <div>
              <h4>Outline & private notes</h4>
              <ReactMarkdown source={outline.replace(/\n/g, '<br/>\n')} />{' '}
              {/* consolidate line breaks */}
            </div>
          )}
        </div>
        <div className="mb-10">
          {sessionSpeakers.map(speaker => <Speaker key={speaker._id} speaker={speaker} />)}
        </div>
      </Container>
      <Modal isOpen={!!this.state.isDelete} toggle={this.toggleDeleteModal}>
        <ModalBody>
          <p>
            are you sure you want to delete this proposal?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteProposal}>Yes, Delete</Button>{' '}
          <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Page>
  );
  }
};

export default SessionPageRoute(SessionPage);

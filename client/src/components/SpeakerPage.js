import React from 'react';
import Page from "./Page";
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr, getHref} from "../utils";
import heroImg from '../images/speaker.png';
import {Link} from "react-router-dom";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";
import { Button } from 'reactstrap';
import SpeakerPageRoute from './SpeakerPageRoute';

export class SpeakerPage extends React.Component {

  state = {
    isUploadingPhoto: false,
  };

  onUploadingPhoto = () => {
    this.setState({ isUploadingPhoto: true });
  };

  onPhotoUploaded = async (imgData) => {
    await this.props.updateUserPhoto(this.props.speaker._id, imgData);
    this.setState({ isUploadingPhoto: false });
  };

  render() {
    const { speaker, proposals: allProposals, user, isUser } = this.props;
    const { name, proposals, bio, isReversimTeamMember } = speaker;
    const { isUploadingPhoto } = this.state;


    const sessions = proposals.map(proposalId => allProposals[proposalId]);

    return <Page title={name} user={user} {...this.props}>
      <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
      <Container>
        <Row>
          <Col sm={{size: 8, offset: 2}}>
            <SpeakerShort speaker={speaker} editable={true} />
            { isReversimTeamMember && <div className="mb-3"><small className="py-1 px-2 bg-danger text-white">Team member</small></div> }
            {isUser && <Button
              color="primary" className="mb-4 text-center" disabled={isUploadingPhoto}
              style={{ width: 150, position: 'relative', overflow: 'hidden' }}
            >
              {isUploadingPhoto ? "Uploading" : "Upload photo"}
              <input
                type='file' disabled={isUploadingPhoto} style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }} onChange={e => {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = e2 => this.onPhotoUploaded(e2.target.result);
                reader.readAsDataURL(f);
                this.onUploadingPhoto();
              }}
              />
            </Button>}
            <Row noGutters={true} className="mb-5">
              <p>{bio}</p>
            </Row>
            {sessions.length ? <h4 className="mb-4">{`${name.split(" ")[0]}'s Proposals`}</h4> : null}
            {sessions.map(session =>
              <div className="bg-faded p-3 mb-4" key={session._id}>
                <p>{getSessionTypeStr(session.type)}</p>
                <div className="d-flex text-muted mb-3">{session.tags.map(Tag)}</div>
                <Link to={`/session/${getHref(session)}`}><h5>{session.title}</h5></Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Page>
  }
}

export default SpeakerPageRoute(SpeakerPage);
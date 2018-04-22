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
    const { name, proposals, bio, isReversimTeamMember, video_url, trackRecord } = speaker;
    const { isUploadingPhoto } = this.state;


    const sessions = proposals.map(proposalId => allProposals[proposalId]);

    return <Page title={name} user={user} {...this.props}>
      <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
      <Container>
        <Row>
          <Col sm={{size: 8, offset: 2}}>
            <SpeakerShort speaker={speaker} editable={isUser} />
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
            {trackRecord && <div className="mb-3">
              <h4>Track record</h4>
              <div>{trackRecord}</div>
            </div>}
            {video_url && <div className="mb-3">
              <h4>Video URL</h4>
              <div>{video_url}</div>
            </div>}
            { sessions && sessions.length && <div className="mt-10">
              <h4 className="mb-4">{`${name.split(" ")[0]}'s Proposals`}</h4>
              {sessions.map(session =>
                <Link to={`/session/${getHref(session)}`} className="unstyled-link">
                  <div className="bg-gray-200 p-3 mb-4" key={session._id}>
                  <h5>{session.title}</h5>
                  <div className="d-flex mb-3 font-size-sm">
                    <div className="mr-10">{getSessionTypeStr(session.type)}</div>
                    <div className="text-muted d-flex">{session.tags.map(Tag)}</div>
                  </div>
                </div>
                </Link>
              )}
            </div>}
          </Col>
        </Row>
      </Container>
    </Page>
  }
}

export default SpeakerPageRoute(SpeakerPage);
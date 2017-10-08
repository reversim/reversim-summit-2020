import React from 'react';
import Page from "./Page";
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr} from "../utils";
import heroImg from '../images/speaker.png';
import {Link} from "react-router-dom";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";
import { uploadPhoto } from '../data-service';
import { Button } from 'reactstrap';

const SpeakerPage = ({ speakers, user, match: { params: { id } }, ...props}) => {
  let speaker = speakers.toJS().find(x => x._id === id);
  if (!speaker) speaker = !user.isFetching && user;
  if (!speaker || !speaker.sessions) return null;

  const { name, bio, sessions } = speaker;
  const isUser = id === user.id;

  return <Page title={`${name} · Reversim Summit 2017`} user={user} {...props}>
    <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
    <Container>
      <Row>
        <Col sm={{size: 8, offset: 2}}>
          <SpeakerShort {...speaker}/>
          { isUser && <Button color="primary" className="mb-4 text-center" disabled={props.isUploadingPhoto} style={{width: 150, position: 'relative', overflow: 'hidden'}}>
            { props.isUploadingPhoto ? "Uploading" : "Upload photo" }
            <input type='file' disabled={props.isUploadingPhoto} style={{opacity: 0,
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0}} onChange={e => {
              const f = e.target.files[0];
              if (!f) return;
              const reader = new FileReader();
              reader.onload = e2 => uploadPhoto(e2.target.result).then(({ imageUrl }) => props.onPhotoUploaded(imageUrl));
              reader.readAsDataURL(f);
              props.onUploadingPhoto();
            }}/>
          </Button>}
          <Row noGutters={true} className="mb-5">
            <p>{bio}</p>
          </Row>
          {sessions.length ? <h4 className="mb-4">{`${name.split(" ")[0]}'s Session`}</h4> : null}
          {sessions.map(session =>
            <div className="bg-faded p-3 mb-4" key={session.id}>
              <p>{getSessionTypeStr(session.type)}</p>
              <div className="d-flex text-muted mb-3">{session.tags.map(Tag)}</div>
              <Link to={`/session/${session.id}`}><h5>{session.title}</h5></Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  </Page>
};

export default SpeakerPage;
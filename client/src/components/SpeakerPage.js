import React from 'react';
import Page from './Page';
import {Container} from 'reactstrap';
import {getSessionTypeStr, getHref} from '../utils';
import {Link} from 'react-router-dom';
import Tag from './Tag';
import {Button} from 'reactstrap';
import SpeakerPageRoute from './SpeakerPageRoute';
import ReactMarkdown from 'react-markdown';
import SpeakerSocialLinks from './SpeakerSocialLinks';

export class SpeakerPage extends React.Component {
  state = {
    isUploadingPhoto: false,
  };

  onUploadingPhoto = () => {
    this.setState({isUploadingPhoto: true});
  };

  onPhotoUploaded = async imgData => {
    await this.props.updateUserPhoto(this.props.speaker._id, imgData);
    this.setState({isUploadingPhoto: false});
  };

  render() {
    const {speaker, proposals: allProposals, user, isUser} = this.props;
    const {name, proposals, bio, isReversimTeamMember, video_url, trackRecord} = speaker;
    const {isUploadingPhoto} = this.state;

    const sessions = proposals.map(proposalId => allProposals[proposalId]).filter(x => x);

    return (
      <Page title={name} user={user} {...this.props}>
        <Container>
          <h2 className="mb-0 p-relative z-1">{speaker.name}</h2>
          <div className="d-flex align-items-start">
            <div className="flex-1 bg-emph pl-4 pr-8 pt-8 pb-4" style={{marginTop: -20}}>
              {isReversimTeamMember && (
                <div className="mb-3 text-center text-md-left">
                  <small className="py-1 px-2 bg-danger text-white">Team member</small>
                </div>
              )}
              <div className="font-size-md mb-4">{speaker.oneLiner}</div>
              <p className="font-size-sm">{bio}</p>
              {trackRecord && (
                <div className="mb-3">
                  <h4>Track record</h4>
                  <div className="font-size-sm">
                    <ReactMarkdown source={trackRecord} />
                  </div>
                </div>
              )}
              {video_url && (
                <div className="mb-3">
                  <h4>Video URL</h4>
                  <div>
                    <a href={video_url} target="_blank" className="text-white">
                      {video_url}
                    </a>
                  </div>
                </div>
              )}
              <SpeakerSocialLinks {...speaker} />
            </div>
            <div
              style={{
                flex: '0 0 200px',
                marginLeft: -20,
              }}
              className="mt-5 p-relative">
              <img src={speaker.picture} alt={speaker.name} className="w-100" />
              <div
                className="p-absolute stretch"
                style={{boxShadow: 'inset 0 0 49px 0 rgba(1, 0, 53, 0.8)'}}
              />
            </div>
          </div>
          {isUser && (
            <Button
              color="primary"
              className="d-block mb-4 mx-auto mx-md-0"
              disabled={isUploadingPhoto}
              style={{width: 150, position: 'relative', overflow: 'hidden'}}>
              {isUploadingPhoto ? 'Uploading' : 'Upload photo'}
              <input
                type="file"
                disabled={isUploadingPhoto}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                onChange={e => {
                  const f = e.target.files[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = e2 => this.onPhotoUploaded(e2.target.result);
                  reader.readAsDataURL(f);
                  this.onUploadingPhoto();
                }}
              />
            </Button>
          )}
          {sessions && sessions.length ? (
            <div className="mt-10">
              <h3 className="mb-4 font-weight-bold">{`${name.split(' ')[0]}'s session`}</h3>
              {sessions.map(session => (
                <Link
                  key={session._id}
                  to={`/session/${getHref(session)}`}
                  className="unstyled-link">
                  <div className="bg-emph p-3 mb-4 d-inline-block" key={session._id}>
                    <h4 className="font-weight-heavy font-size-md">{session.title}</h4>
                    <div className="d-flex mb-3 font-size-sm">
                      <div className="mr-8">{getSessionTypeStr(session.type)}</div>
                      <div className="d-flex">{session.tags.map(Tag)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            undefined
          )}
        </Container>
      </Page>
    );
  }
}

export default SpeakerPageRoute(SpeakerPage);

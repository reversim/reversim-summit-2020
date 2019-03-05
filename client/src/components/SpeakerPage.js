import React from 'react';
import cn from 'classnames';
import Page from './Page';
import {Container} from 'reactstrap';
import {getHref, key} from '../utils';
import {Link} from 'react-router-dom';
// import Tag from './Tag';
import {Button} from 'reactstrap';
import SpeakerPageRoute from './SpeakerPageRoute';
import ReactMarkdown from 'react-markdown';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import SessionInfo from './SessionInfo';
import plus from '../images/SVG/x.svg';

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
    const canEdit = (user && user.isReversimTeamMember) || isUser;

    const sessions = proposals.map(proposalId => allProposals[proposalId]).filter(x => x);

    return (
      <Page title={name} user={user} {...this.props}>
        <div className="speaker-page__hero bg-purple2">
          <Container>
            <div className="d-flex align-items-start speaker-page__speaker-wrapper p-relative">
              <div
                style={{backgroundImage: `url(${speaker.picture})`}}
                className="speaker-page__speaker-picture b-strong mr-5"
              />
              <div className="flex-grow-1">
                <h3 className="mb-0 font-size-xxl text-white">
                  {speaker.name}
                  {canEdit && (
                    <Link to={`/speaker/${speaker._id}/edit`} className="d-block">
                      <Button>Edit</Button>
                    </Link>
                  )}
                  {isReversimTeamMember && (
                    <div className="mb-3 text-center text-md-left">
                      <small className="py-1 px-2 bg-danger text-white">Team member</small>
                    </div>
                  )}
                </h3>
                <p className="text-white font-size-lg mt-3 mb-4">{speaker.oneLiner}</p>
                <SpeakerSocialLinks {...speaker} />
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <p className="font-size-md mb-10">{bio}</p>
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
          {canEdit && (
            <Button
              color="primary"
              className="d-block mb-4 mx-auto mx-md-0 mt-3"
              disabled={isUploadingPhoto}
              style={{position: 'relative', overflow: 'hidden'}}>
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
            <React.Fragment>
              <div className="d-flex align-items-center mb-8">
                <img src={plus} alt="" height="100" className="mr-2" />
                <h3 className="text-purple2 font-size-xl mr-4">
                  {speaker.name.split(' ')[0]}'s sessions
                </h3>
                <div className="bt flex-grow-1 border-bottom border-purple2 border-top" />
              </div>
              <div className="d-flex flex-wrap">
                {sessions.map((session, i) => (
                  <div
                    className={cn('b-strong p-4 speaker-page__session mb-8', {'mr-8': !(i % 2)})}
                    key={key()}>
                    <h4 className="font-weight-bold font-size-lg">{session.title}</h4>
                    <div className="mb-9">
                      <SessionInfo session={session} />
                    </div>
                    {/* <div className="d-flex">{session.tags.map(Tag)}</div> */}
                    <Link
                      key={session._id}
                      to={`/session/${getHref(session)}`}
                      className="unstyled-link float-right">
                      <Button className="styled-button">Read more</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            undefined
          )}
        </Container>
      </Page>
    );
  }
}

export default SpeakerPageRoute(SpeakerPage);

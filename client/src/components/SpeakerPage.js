import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Page from './Page';
import SpeakerPageRoute from './SpeakerPageRoute';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import SessionInfo from './SessionInfo';
import plus from '../images/SVG/plus.svg';
import {Link} from 'react-router-dom';
import {Container, Button} from 'reactstrap';
import {getHref, key} from '../utils';
import {image} from '../images';
import {
  PageHero,
  ResponsiveContainer,
} from './GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../styles/MediaQueriesMixin';

// import Tag from './Tag';

// styled-components components

const SpeakerHero = styled(PageHero)`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.xl}; 
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      padding: calc(2 * ${space.xxl}) 0 0 0 ; 
      margin-bottom: ${space.xl}; 
    `}
  `}  
  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      padding-top: calc(2 * ${space.xxl}); 
      margin-bottom: ${space.xl}; 
    `}
  `}  
`;

const HeroContainer = styled(ResponsiveContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin: 0 auto;
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      align-items: flex-start;  
      margin: 0 ${space.xxl};
    `}  
  `}
  ${mediaQueryMin.l`
    height: 195px;
    margin: 0 auto;
  `}
`;


// const SpeakerImg = styled.div`
//   ${({ theme: { space, color  }, speaker: {picture} }) => `
//   position: relative;
//   width: 230px;
//   height: 230px;
//   top: calc(7 * ${space.m});
//   margin-right: ${space.xl};

//   background-image: url(${image(picture, 222, 222)});
//   background-size: cover;
//   border: 4px solid ${color.border_1};
//   `}
// `;

// React components

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
    const {speaker, proposals: allProposals, user, isUser, eventConfig, acceptedProposals} = this.props;
    const {name, proposals, bio, isReversimTeamMember, video_url, trackRecord} = speaker;
    const { cfp, moderationCompleted } = eventConfig;

    const {isUploadingPhoto} = this.state;
    const canEdit = (user && user.isReversimTeamMember) || isUser;
    const canSeeStatus = canEdit && cfp || moderationCompleted;

    let sessions = proposals.map(proposalId => allProposals[proposalId]).filter(x => x);
    if(!canSeeStatus){
      sessions = proposals.map(proposalId => acceptedProposals[proposalId]).filter(x => x);
    }

      return (
      <Page title={name} user={user} {...this.props}>
        <SpeakerHero>
          <HeroContainer>
            <div
              style={{backgroundImage: `url(${image(speaker.picture, 222, 222)})`}}
              className="speaker-page__speaker-picture b-strong mr-5 p-relative"
            />
            
            <div className="flex-grow-1">
              <h3 className="mb-3 line-height-1 font-size-xxl text-white">
                {speaker.name}
                {canEdit && (
                  <Link to={`/speaker/${speaker._id}/edit`} className="d-block">
                    <Button className="styled-button on-purple btn btn-secondary">Edit</Button>
                  </Link>
                )}
                {isReversimTeamMember && (
                  <div className="mb-3 text-center text-md-left">
                    <small className="py-1 px-2 bg-danger text-white">Team member</small>
                  </div>
                )}
              </h3>
              <p className="text-white font-size-lm mb-4 line-height-15">{speaker.oneLiner}</p>
            </div>
          </HeroContainer>
        </SpeakerHero>
        <div className="white-bg">
        <Container>
            <SpeakerSocialLinks {...speaker} />
          <p className="font-size-md mb-10 mt-16">{bio}</p>
          {trackRecord && (
            <div className="mb-3 text-break">
              <h4>Track record</h4>
              <div className="font-size-sm">
                <ReactMarkdown source={trackRecord} />
              </div>
            </div>
          )}
          {video_url && (
            <div className="mb-3 text-break">
              <h4>Video URL</h4>
              <div>
                <a href={video_url} target="_blank">
                  {video_url}
                </a>
              </div>
            </div>
          )}
          {canEdit && (
            <Button
              className="d-block mb-4 mx-auto mx-md-0 mt-3 styled-button btn btn-secondary"
              disabled={isUploadingPhoto}
              style={{position: 'relative', overflow: 'hidden'}}>
              {isUploadingPhoto ? 'Uploading' : 'Upload Photo'}
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
                <div className="flex-grow-1 border-bottom border-purple2" />
              </div>
              <div className="d-flex flex-wrap align-items-start">
                {sessions.map((session, i) => (
                  <div
                    className={cn('b-strong p-4 speaker-page__session mb-8', {'mr-8': !(i % 2)})}
                    key={key()}>
                    <h4 className="font-weight-bold font-size-lg">{session.title}</h4>
                    <div className="mb-9">
                      <SessionInfo session={session} />
                    </div>
                    {/* <div className="d-flex">{session.tags.map(Tag)}</div> */}
                    <div className='d-flex justify-content-between mobile-flex-column'>
                      {canSeeStatus && <div className='text-purple2 font-weight-bold font-size-lm'>Status: {session.status === 'accepted' ? 'Accepted' : 'Sadly not this time'}</div>}
                      <Link
                        key={session._id}
                        to={`/session/${getHref(session)}`}
                        className="unstyled-link float-right">
                        <Button className="styled-button">Read more</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            undefined
          )}
        </Container>
          </div>
      </Page>
    );
  }
}

export default SpeakerPageRoute(SpeakerPage);

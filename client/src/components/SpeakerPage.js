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
import {Button} from 'reactstrap';
import {getHref, key} from '../utils';
import {image} from '../images';
import {
  PageHero,
  ResponsiveContainer,
  Heading2,
  ButtonStyledLink,
  StyledButton,

} from './GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../styles/MediaQueriesMixin';

// import Tag from './Tag'; //IMPORTAT: See if should delete this.

// styled-components components

const SpeakerHero = styled(PageHero)`
  ${({ theme: { space } }) => `
    padding: calc(12 * ${space.m}) 0 calc(10 * ${space.m}) 0;
    margin-bottom: ${space.xl}; 
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      padding: 0 ; 
      margin-bottom: ${space.xl}; 
    `}
  `}  
  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      padding-top: calc(2 * ${space.xxl}); 
      margin: 0 auto calc(15 * ${space.m}) auto;
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

const SpeakerImgContainer = styled.div`
  ${({ theme: { space } }) => `
  position: relative;
  top: calc(7 * ${space.m});
  margin-right: ${space.xl};

  display: flex;
  flex-direction: column;
  align-items: center;

  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) =>`
      top: calc(17 * ${space.m});
    `}
  `}
  ${mediaQueryMin.l`
    ${({ theme: { space } }) =>`
      top: calc(7 * ${space.m});
    `}
  `}
`;

const SpeakerImg = styled.div`
  ${({ theme: { space, color }, speaker: {picture} }) => `
    min-width: 230px;
    min-height: 230px; 

    margin-bottom: ${space.l};

    background-image: url(${image(picture, 222, 222)});
    background-size: cover;
    border: 4px solid ${color.border_1};
  `}
`;

const ChangePhotoButton = styled(StyledButton)`
  min-width: initial;
  width: fit-content;
  ${mediaQueryMin.l`
    ${({ theme: { color } }) => `
      border: solid 2px ${color.box_shadow_1};
      box-shadow: -2px 2px ${color.box_shadow_2}, -4px 4px ${color.box_shadow_1};
    `}
  `}  
`;

const ChangePhotoInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SpeakerIntroContainer = styled.div`
  ${({ theme: { space } }) => `
    display: flex;
    flex-direction: column;
    position: relative;
    top: calc(9 * ${space.m});
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      top: -${space.xl};
      left: calc(32 * ${space.m});
    `}
  `}
  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      top: calc(-23 * ${space.m});
    `}
  `}
`;

const NameAndEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaQueryMin.l`
    flex-direction: row;
  `}
`;

const SpeakerName = styled(Heading2)`
  ${({ theme: { color, space } }) => `
    color: ${color.text_1};
    line-height: 1;
    margin: 0 0 ${space.l} 0;
  `}
`;

const EditAndTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaQueryMin.m`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  `}
  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      margin-left: ${space.xl};
    `}
  `}
`;

const TopEditButton = styled(ButtonStyledLink)`
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      min-width: initial;
      width: min-content;
      margin-left: ${space.xl};
    `}
  `}
`;

const TeamMemberTag = styled.p`
  ${({ theme: { space, color, font } }) => `
    padding: ${space.s} ${space.m};
    margin-bottom: ${space.l};
    
    color: ${color.text_1};
    background: ${color.important};
    font-size: ${font.size_reg};
    font-weight: ${font.weight_medium}
  `}
`;

const Oneliner = styled.p`
  ${({ theme: { color, font, space } }) => `
    color: ${color.text_1};
    font-size: ${font.size_bg};
    margin-bottom: ${space.xl};
  `}
`;

const MainContainer = styled(ResponsiveContainer)`
margin: 0 auto;
`;

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

  onChangePhoto = e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = e2 => this.onPhotoUploaded(e2.target.result);
    reader.readAsDataURL(f);
    this.onUploadingPhoto();
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
            <SpeakerImgContainer>
              <SpeakerImg speaker={speaker}/>
              {canEdit && (
                <ChangePhotoButton
                  disabled={isUploadingPhoto}
                >
                  {
                    !!speaker.picture 
                      ? 'Change Photo'
                      : isUploadingPhoto 
                        ? 'Uploading'
                        : 'Upload Photo'
                  }
                  <ChangePhotoInput
                    type="file"
                    disabled={isUploadingPhoto}
                    onChange={e => this.onChangePhoto(e)}
                  />
                </ChangePhotoButton>
                )
              }
            </SpeakerImgContainer>

            <SpeakerIntroContainer>
              <NameAndEditContainer>
                <SpeakerName>{speaker.name}</SpeakerName>
                <EditAndTeamContainer>
                  {isReversimTeamMember && (
                    <TeamMemberTag>Team member</TeamMemberTag>
                  )}
                  {canEdit && (
                    <TopEditButton href={`/speaker/${speaker._id}/edit`}>Edit</TopEditButton>
                  )}
                </EditAndTeamContainer>
              </NameAndEditContainer>

              <Oneliner>{speaker.oneLiner}</Oneliner>
            
            </SpeakerIntroContainer>
          </HeroContainer>
        </SpeakerHero>

        <MainContainer>
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
          </MainContainer>
      </Page>
    );
  }
}

export default SpeakerPageRoute(SpeakerPage);

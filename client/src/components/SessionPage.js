import React, { Component } from "react";
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getLoginUrl } from "./Redirect";

import {
  Button,
  ModalBody,
  ModalFooter,
  Modal
} from "reactstrap";

import {
  ResponsiveContainer,
  Heading2,
  Heading4,
  Heading5,
  Paragraph2,
  InvertedButtonStyleLink,
  InvertedColorLink,
  StyledButton,

} from './GlobalStyledComponents/ReversimStyledComps'
import Page from "./Page";
import { getHref, key } from "../utils";
import SessionPageRoute from "./SessionPageRoute";
import SessionDayTime from "./SessionDayTime";
import VoteButtons from "./VoteButtons";
import {image} from '../images';
import SessionInfo from "./SessionInfo";
import mediaQueryMin from "../styles/MediaQueriesMixin";

library.add(faPencilAlt, faTrash);

//styled-components components

const GeneralLink = styled(InvertedColorLink)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_medium};
  `}
`;

const ContentContainer = styled(ResponsiveContainer)`
  ${({ theme: { space } }) => `
    padding: 0 ${space.l};
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      margin: ${space.xl} ${space.xl} 0 ${space.xl};
    `}
  `}
  ${mediaQueryMin.xxl`
    margin: 0 auto;
  `}
`;

const SessionPageHero = styled.div`
  ${({ theme: { space, color } }) => `
    padding: calc(12 * ${space.m}) 0 calc(3 * ${space.m}) 0;
    background: ${color.background_2};
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      margin: 0 auto;
      padding: calc(18.5 * ${space.m}) 0 calc(6.5 * ${space.m}) 0;
    `}
  `}
`;

const HeroHeading = styled(Heading2)`
  ${({ theme: { color } }) => `
    margin-right: 0;  
    color: ${color.text_1};
  `}
  ${mediaQueryMin.l`
    white-space: initial;
  `}
`;

const TypeAndTimeContianer = styled.div`
  ${({ theme: { space } }) => `
   margin: ${space.xl} auto;
  `}
`;

const StatAndEditContainer = styled.div`
  ${({ theme: { space } }) => `
  margin-bottom: ${space.m};
  display: flex;
  justify-content: center;
  `}
`;

const SessionStatus = styled(Heading4)`
  ${({ theme: { color, font } }) => `
    color: ${color.text_3};
    font-weight: ${font.weight_bold};
  `}
`;

const EditButton = styled(InvertedButtonStyleLink)`
  min-width: initial;
`;

const TextContainer = styled.div`
  ${({ theme: { space, font } }) => `
    margin-bottom: ${space.xxl};
    font-size: ${font.size_md};
    font-weight: ${font.weight_normal};
  `}
`;

const TextHeading = styled(Heading5)`
  ${({ theme: { color, font } }) => `
    color: ${color.text_3};
    font-weight: ${font.weight_bold};
  `}
`;

const StyledMarkdown = styled(ReactMarkdown)`
  ${({ theme: { font }}) => `
    font-size: ${font.size_reg};
    font-weight: ${font.weight_medium};
  `}
`;

const VoteAndSpeakersContainer = styled.div`
  ${({ theme: { space } }) => `
    width: 100%;  
    margin: ${space.xxl} auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    `}

    ${mediaQueryMin.l`
      flex-direction: row;
      justify-content: space-around;
    `}
`;

const SpeakerContainer = styled.div`
  ${({ theme: { space, color } }) => `
    display: flex;
    width: 100%;
    margin-bottom: calc(4 * ${space.m});
    border: 4px solid ${color.border_1};
  `}

  ${mediaQueryMin.l`
    width: 47.5%;
  `}
`;

const SpeakerImg = styled.div`
  ${({ theme: {color}, speaker: {picture} }) => `
    min-width: 50%;
    height: 240px;
    border-right: 4px solid ${color.border_1};

    background-image: url('${image(picture, 236, 240)}');
    background-size: cover;
    background-position: center;
  `}
  ${mediaQueryMin.m`
    min-width: 35%;
  `}
  ${mediaQueryMin.l`
    min-width: 50%;
  `}
`;

const SpeakerNameAndLink = styled.div`
  ${({ theme: { space } }) => `
    padding: ${space.m};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  `}
  ${mediaQueryMin.xl`
    ${({ theme: { space } }) =>`
      padding: ${space.l};
    `}
  `}
`;

const SpeakerName = styled.p`
  ${({ theme: { font } }) => `
    max-width: 135px;
    font-size: ${font.size_bg};
    font-weight: ${font.weight_medium};
    overflow-wrap: break-word;
  `}
  ${mediaQueryMin.s`
    max-width: initial;
  `}
`;

const SpeakerProfileLink = styled(InvertedButtonStyleLink)`
  ${({ theme: { space } }) => `
  min-width: initial;
  max-width: 130px;
  height: initial;
  margin: 0 0 ${space.s} 0;
  align-self: flex-end;
  `}
  ${mediaQueryMin.m`
  max-width: initial;
  `}
  ${mediaQueryMin.l`
  max-width: 130px;
  `}
  ${mediaQueryMin.xl`
  max-width: initial;
  `}
`;

const TrashButton = styled(StyledButton)`
  ${({theme: {color }}) => `
  background-image: linear-gradient(to right, ${color.button_bkgr_4} 50%, ${color.button_bkgr_1} 50%);
  position: relative;
  float: right;
  `}
`;

const TrashModalBody = styled(ModalBody)`
  ${({ theme: { color } }) => `
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${color.background_5};
  `}
`;

const ModalMessage = styled.p`
  ${({ theme: { font } }) => `
    font-family: ${font.main};
    font-size: ${font.size_md};
    font-weight: ${font.weight_bold};
    width: 85%;
  `}
`;

const TrashModalFooter = styled(ModalFooter)`
  ${({ theme: { color } }) => `
    display: flex;
    align-items: flex-end;
    background: ${color.background_5};
    border: 0;
  `}
`;

const DeleteButton = styled(TrashButton)`
  min-width: initial;
`;

const CancelButton = styled(StyledButton)`
  min-width: initial;
`;

//React component
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
    // IMPORTANT: NETA- remove the always true
    const editPeriod = true;
    
    const canEdit = (isAuthor && editPeriod) || isTeamMember;
    
    const canSeeStatus = (isAuthor || isTeamMember) && moderationCompleted;
    
    return (
      <Page title={session.title} {...this.props} isSingleContent={true}>
        <SessionPageHero>
          <ContentContainer>
            <HeroHeading>
              {title}
            </HeroHeading>
          </ContentContainer>
        </SessionPageHero>
        
        <ContentContainer>
          <TypeAndTimeContianer>
            <SessionInfo session={session} size="md" className="SessionInfo"/>
              <SessionDayTime id={id} className="DayTime"/>  {/*NOTE: Try to understand if it doesn't render on purpose or what, also might be repetative*/}
          </TypeAndTimeContianer>

          <StatAndEditContainer>
            {canSeeStatus && (
              <SessionStatus>
                Status:
                {session.status === "accepted" ? " Accepted" : " Sadly not this time"}
              </SessionStatus>
            )}

            {canEdit && (
              <EditButton
                href={`/session/${getHref(session)}/edit`}
              >
                <FontAwesomeIcon icon="pencil-alt" />
              </EditButton>
            )}
          </StatAndEditContainer>
          
          <TextContainer>
            <TextHeading>Abstract</TextHeading>
            <StyledMarkdown source={abstract} />
          </TextContainer>
          {outline && (
            <TextContainer>
              <TextHeading>Outline</TextHeading>
              <StyledMarkdown source={outline.replace(/\n/g, "<br/>\n")} />{" "}
              {/* NOTE: Is this .replace() good for us? it's regex that means replace all \n with <br/>\n globaly so there will be linke breaks when needed */}
            </TextContainer>
          )}
          {!isTeamMember &&
            trackRecords &&
            trackRecords.map((speaker, i) => {
            return speaker.trackRecord 
            ? (
                <TextContainer key={i}>
                  <TextHeading>{speaker.name}'s Track record</TextHeading>
                  <StyledMarkdown source={speaker.trackRecord} />
                </TextContainer>
              )
            : (
              <TextContainer key={i}>
                <TextHeading>{speaker.name}'s Track record</TextHeading>
                <Paragraph2>{speaker.name} has not submitted any trackRecords.</Paragraph2>
              </TextContainer>
            )
            }
            )}
          {isTeamMember &&
            video_urls &&
            video_urls.map((speaker, i) => (
              speaker.video_url && (
              <TextContainer className="mb-3" key={i}>
                <TextHeading>Watch {speaker.name}</TextHeading>
                <GeneralLink href={speaker.video_url} target="_blank">
                  Link to {speaker.name}'s video
                </GeneralLink>
              </TextContainer>
              )
            ))}

          <VoteAndSpeakersContainer>
            {!user && voting && <InvertedButtonStyleLink href={getLoginUrl()}>Login to vote!</InvertedButtonStyleLink>}
            {user && voting && (
              <VoteButtons
              user={user}
              attended={attended}
              proposalId={id}
              attendProposal={attendProposal}
              eventConfig={eventConfig}
              />
            )}
          </VoteAndSpeakersContainer>

          <VoteAndSpeakersContainer>
            {sessionSpeakers.map(speaker => (
              <SpeakerContainer key={key()}>
                <SpeakerImg speaker={speaker} />
                <SpeakerNameAndLink>
                  <SpeakerName>
                    {speaker.name}
                  </SpeakerName>
                  <SpeakerProfileLink
                    key={speaker._id}
                    href={`/speaker/${getHref(speaker)}`}
                  >
                    Speaker's Profile
                  </SpeakerProfileLink>
                </SpeakerNameAndLink>
              </SpeakerContainer>
            ))}
          </VoteAndSpeakersContainer>

          {canEdit && (
           <TrashButton
             onClick={this.askDelete}
           >
             <FontAwesomeIcon icon="trash" /> Delete Proposal
           </TrashButton>
          )}

        </ContentContainer>
        <Modal isOpen={!!this.state.isDelete} toggle={this.toggleDeleteModal}>
          <TrashModalBody>
            <ModalMessage>are you sure you want to delete this proposal?</ModalMessage>
          </TrashModalBody>
          <TrashModalFooter>
            <DeleteButton onClick={this.deleteProposal}>
              Yes, Delete
            </DeleteButton>{" "}
            <CancelButton onClick={this.toggleDeleteModal}>
              Cancel
            </CancelButton>
          </TrashModalFooter>
        </Modal>
      </Page>
    );
  }
}

export default SessionPageRoute(SessionPage);

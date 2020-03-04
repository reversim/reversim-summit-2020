import React from 'react';
import styled from 'styled-components';

import Page from './Page';
import ReadMore from './ReadMore';

import xBackground from '../images/SVG/x.svg';

import mediaQueryMin from '../styles/MediaQueriesMixin';
import {
  AlignCenterColumn,
  HeadingAligner,
  HeadingHoop,
  PageHeading,
  BreakLineInverted,
  Heading4,
  Paragraph,
  SimpleLink,
  Heading2,
  BreakLineMain,
} from './GlobalStyledComponents/ReversimStyledComps';

// styled-componets components

const IntroContainer = styled.div`
  ${({ theme: { color, font, space } }) => `
    padding: calc(2 * ${space.xxl}) 0 calc(3 * ${space.xl}) 0;

    background-color: ${color.background_2};
    background-image: url(${xBackground});
    background-repeat: no-repeat;
    background-size: 600px;
    background-position: 50% 120%;

    color:  ${color.text_1};
    font-size: ${font.size_md};
  `}
`;

const MeetTheTeamContainer = styled(AlignCenterColumn)`
  ${({ theme: { color } }) => `
    background-color: ${color.background_4};
  `}
`;

const IntroHeadingContainer = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    padding-top: calc(3 * ${space.xl});
  `}
`;

const IntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueryMin.l`
    flex-direction: row;
  `}
`;

const IntroParagraphContainer = styled.div`
  ${({ theme: { space } }) => `
    flex: 1;
    margin-right: calc(3 * ${space.l});
    padding-top: ${space.xxl};
  `}
`

const IntroSubHeading = styled(Heading4)`
  ${({ theme: { font,  } }) => `
    font-weight: ${font.weight_medium};
  `}
`

const IntroParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
  `}
`

const IntroLink = styled(SimpleLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
  `}
`;

const MainHeadingContainer = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    padding: calc(8 * ${space.m}) 0 calc(6 * ${space.m}) 0;
  `}
`;

const MainHeading = styled(Heading2)`
  width: initial;
`;

const AboutTeam = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AboutTeamMember = styled.div`
  ${({ theme: { space } }) => `
    margin-bottom: calc(6* ${space.m});
    display: flex;
    flex-direction: column;
    flex: 0 0 100%;
  `}

  ${mediaQueryMin.m`
    flex-direction: row;
  `}

  ${mediaQueryMin.l`
    min-width: 780px;
    max-width: 780px;
    align-self: center;
  `}

  ${mediaQueryMin.xl`
    flex: 0 0 calc(50% - 20px);
  `}
`;

const MemberImgContainer = styled.div`
  ${({ theme: { color } }) => `
  display: flex;
  justify-content: center;
  height: 240px;
  flex: 0 0 240px;

  border: 4px solid ${color.box_shadow_1};
  border-bottom: 0px;
  `}
  ${mediaQueryMin.m`
  ${({ theme: { color } }) => `
    border: 4px solid ${color.box_shadow_1};
    border-right: 0px;
  `}`}
`

const MemberImg = styled.div`
  ${({ picture }) => `
    background-image: url(${picture});
    width: 240px;
    
    background-size: cover;
    background-position: top;
  `}
`;

const MemberDescriptionContainer = styled.div`
  ${({ theme: { space, color }, isExpanded }) => `
    padding: calc(2 * ${space.m});
    border: 4px solid ${color.box_shadow_1};
    line-height: 1.2;
    flex-grow: 1;
    transition: height 5s; //NOTE: Would love to add a transition here but did not manage to do so.
    ${ isExpanded
        ? (`
        z-index: 1;
        height: auto;
        min-height: 240px;
        `)
        : `height: 240px;`
    }`}
`;

const MemberName = styled.h4`
  ${({ theme: { font, space } }) => `
    margin-bottom: ${space.m};
    font-size: ${font.size_md};
    font-weight: ${font.weight_bold};
    line-height: 1;
  `}
`;

const MemberOneliner = styled.p`
  ${({ theme: { font, space } }) => `
    margin-bottom: ${space.l};
    line-height: 1.2;
    font-weight: ${font.weight_medium};
    font-size: ${font.size_md};
  `}
`;

const MemberContent = styled.div`
  margin-bottom: 0;
  line-height: 1.5;
`;

// React Components

class TeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggle = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const {
      picture,
      name,
      oneLiner,
      bio
    } = this.props;

    return (
      <AboutTeamMember>
        <MemberImgContainer>
          <MemberImg
            picture={picture}
            alt={name}
          />
        </MemberImgContainer>
        <MemberDescriptionContainer
          isExpanded={this.state.isExpanded}
          onClick={this.toggle} //this doesn't work properly
        >
          <MemberName className="line-height-1 mb-1">{name}</MemberName>
          <MemberOneliner>
            {oneLiner}
          </MemberOneliner>
          <MemberContent>
            <ReadMore
              lines={3}
              truncateText="…"
              more="Read more"
              less="Show less"
              children={bio}
              onToggle={this.toggle}
            />
          </MemberContent>
        </MemberDescriptionContainer>
      </AboutTeamMember>
    );
  }
}

const AboutPage = props => {
  return (
    <Page title="About" {...props}>
      <IntroContainer>
        <AlignCenterColumn>
          <IntroHeadingContainer>
            <HeadingHoop />
            <PageHeading>About</PageHeading>
            <BreakLineInverted />
          </IntroHeadingContainer>
          <IntroTextContainer>
            <IntroParagraphContainer>
              <IntroSubHeading>Reversim Summit</IntroSubHeading>
              <IntroParagraph>
                <IntroLink href="https://twitter.com/reversim/">#reversim</IntroLink> (רברס עם פלטפורמה) 
                summit is our intention to create a conference for
                developers by developers. Like in the podcast, we bring you the
                content we are interested in, and we hope you will be too.
              </IntroParagraph>
              <IntroParagraph>
                This is the 7th(!) Reversim Summit. The summits of 2013 and 2014
                (TLV Campus), 2015 (Technion), 2016 (Weizmann Institute of
                Science), 2017 (College of Management) and 2018 (Tel Aviv
                University) also featured community content. Watch previous
                years' sessions to get the general feel of the Revesim Summit
                spirit.
              </IntroParagraph>
            </IntroParagraphContainer>
            <IntroParagraphContainer>
              <IntroSubHeading>Reversim podcast</IntroSubHeading>
              <IntroParagraph>
                <IntroLink href="https://twitter.com/reversim/">#reversim</IntroLink> (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and
                Ran Tavory which brings together software developers and
                product, with over 300 recorded episodes and a few thousands
                listeners.
              </IntroParagraph>
            </IntroParagraphContainer>
        </IntroTextContainer>
            
        </AlignCenterColumn>
      </IntroContainer>
      <MeetTheTeamContainer>
          <MainHeadingContainer>
            <MainHeading>Meet the team</MainHeading>
            <BreakLineMain />
          </MainHeadingContainer>
          <AboutTeam>
            {props.team.map(id => <TeamMember key={id} {...props.users[id]} />)}
          </AboutTeam>
      </MeetTheTeamContainer>
    </Page>
  );
};

export default AboutPage;

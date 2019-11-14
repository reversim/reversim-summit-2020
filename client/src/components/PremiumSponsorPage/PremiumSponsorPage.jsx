/* eslint-disable prettier/prettier */
// This component is responsible for the sponsors' pages. It renders OpenPosition.jsx
// and SponsorsCarousel.jsx

import React from 'react';
import styled from 'styled-components';
import SponsorPageRoute from '../SponsorPageRoute';
import ReactMarkdown from 'react-markdown';

import Page from '../Page';
import SponsorCarousel from './SponsorCarousel';
import OpenPosition from './OpenPosition';

import triangle from '../../images/SVG/triangle.svg';
import zigzag from '../../images/SVG/zigzag.svg';

import { image } from '../../images';

import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  AlignCenterColumn,
  HeadingAligner,
  HeadingTriangle,
  HeadingZigzag,
  Heading2,
  BreakLineInverted,
  InvertedColorLink,
  Heading3,
  Paragraph,
  Paragraph2,
  BreakLineMain,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

library.add(faMapMarkerAlt);

// styled-components components page's intro

const TopContainer = styled.div`
  ${ ({ theme: { color, space, mq } }) => `
    width: 100%;

    margin: 0 auto calc(12 * ${space.m}) auto;
    padding-top: calc(10 * ${space.m});

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;

    background-color: ${color.background_2};

    @media (max-width: ${mq.l}){
      margin: 0 auto calc(30 * ${space.m}) auto;
      padding: ${space.xxl} 0 0 calc(3.5 * ${space.m});
      justify-content: initial;
    }

    @media (max-width: ${mq.s}){
      margin: 0 0 calc(35 * ${space.m}) 0;
      padding-bottom: ${space.xl};
    }
  `}
`;

const IntroContiner = styled(AlignCenterColumn)`
  ${ ({ theme: { mq, space } }) => `
    @media (min-width: ${mq.l}){
      margin-top: ${space.xxl};
      max-width: 1150px;
    }

    @media (max-width: ${mq.l}){
      margin: 0;
    }
  `}
`;

const HeadingContainer = styled(HeadingAligner)`
  ${ ({theme: { color, space } }) =>`
    padding-top: ${space.xxl};
    background-color: ${color.background_2};
    margin-bottom: ${space.xxl};
  `}
  ${mediaQueryMin.s`
    ${({ theme: { space } }) =>`
    width: 100%;
    margin-top: ${space.xl};
    `}`}
`;

const PageHeading = styled(Heading2)`
  ${ ({ theme: { color } }) => `
    max-width: 90%;
    text-align: initial;
    color: ${color.text_1};

  `}
`;

const HeadingDecorationTriangel = styled(HeadingTriangle)`
  ${ ({ theme: { space, mq } }) => `
    @media (max-width: ${mq.s}){
      margin-bottom: calc(7 * ${space.m});
      text-align: initial;
    }
  `}
`;

const SponsorHeadingContainer = styled.div`
  ${ ({ theme: { space, color, mq } }) =>`
    height: 150px;
    padding-top: ${space.xl};
    display: flex;
    justify-content: space-between;
    background-color: ${color.background_2};

    @media (max-width: ${mq.l}) {
      min-height: 400px; 
      flex-direction: column;
      align-items: center;
    };

    @media (min-width: ${mq.xl}){
      max-width: ${mq.xl}; 
    }
  `}
`;

const LogoAligner = styled.div`
  ${ ({ theme: { mq } }) => `
    @media (max-width: ${mq.l}){
      align-self: baseline;
    }
  `}
`;

const SponsorLogo = styled.img`
  ${( {theme: { color } } ) => `
    max-width: 350px;
    border: 4px solid ${color.box_shadow_1};
  `}
`;

const SponsorHeading = styled.div`
  ${ ({ theme: { space } }) => `
    margin-left: ${space.l};
    padding-bottom: ${space.m};
  `}
`;

const SponsorName = styled(Heading3)`
  ${ ({ theme: { font } }) => `
    font-weight: ${font.weight_medium};
    margin: 0;
  `}
`
const SponsorOneliner = styled(Paragraph)`
  ${ ({ theme: { font } }) => `
    font-size: ${font.size_md};
    font-weight: ${font.weight_medium};
  `}
`;

const MiniNav = styled.div`
  ${ ({ theme: { space, mq } }) => `
    margin: calc(${space.m} * 3) 0 0 calc(${space.m} * 2);

    @media (max-width: ${mq.l}){
      margin: ${space.xxl} 0 0 ${space.l};
    }
  `}
`;

const MiniNavIconContainer = styled.div`
  ${ ({ theme: { space, mq } }) => `
    @media (max-width: ${mq.l}) {
      margin-bottom: ${space.xxl};
    }
  `}
`;

const MiniNavIcon = styled(FontAwesomeIcon)`
  ${ ({ theme: { font, space, color, mq } }) =>`
    font-size: ${font.size_bg};
    margin-right: ${space.xl};
    color: ${color.font_awsome_nav};

    @media (max-width: ${mq.l}) {
      font-size: ${font.size_xl};
    }
  `}
`;

const MiniNavLinksList = styled.ul`
  ${ ({ theme: { space, mq } }) => `
    max-width: 90%;
    margin: ${space.m} 0;

    display: flex;
    
    @media (max-width: ${mq.l}) {
      flex-direction: column;
      min-height: 20vh;
    }
  `}
    
`;

const MiniNavListItem = styled(InvertedColorLink)`
  ${ ({ theme: { space, font, mq } }) => `
  margin-right: ${space.l};

    @media (max-width: ${mq.l}){
      font-size: ${font.size_bg};
    }
  `}
`;

// styled-components sponsor description section

const SponsorDescription = styled(AlignCenterColumn)`
  ${ ({ theme: { space } }) => `
    margin: ${space.m} auto;
    padding: 0;
    `}

    ${mediaQueryMin.l`
      ${ ({ theme: { space } }) =>`
        margin-top: ${space.xxl};
        max-width: 1150px;      
        `}`}

    /* @media (max-width: ${mq.l}){
      margin-left: calc(6 * ${space.m});
    }

    @media (max-width: ${mq.m}){
      justify-content: initial;
    } */
`;

const SegmentContainer = styled.div`
  ${ ({ theme: { space, mq } }) => `
    display: flex;
    flex-direction: column
    justify-content: space-between;
    margin: ${space.l} 0;
      
    @media (max-width: ${mq.l}) {
      min-height: 20vh;      

      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: ${mq.m}) {
      max-width: 660px;
    }

    @media (max-width: ${mq.s}){
      max-width: 400px;
      justify-content: center;
    }
  `}
`;

const WhoWeAre = styled(SegmentContainer)`
  ${ ({ theme: { mq } }) => `
     @media (max-width: ${mq.m}){
      justify-content: center;
    }
  `}
`;

const SegmentHeadingAligner = styled(HeadingAligner)`
  ${ ({ theme: { space } }) => `
    margin-bottom: 0;
    margin-top: calc(-13 * ${space.m});
    padding-top: calc(13 * ${space.m});
    z-index: -1;
  `}
`;

const SegmentHeading = styled(Heading3)`
  ${ ({ theme: { color, font, mq } }) => `

    color: ${color.text_3};
    font-weight: ${font.weight_medium};

    @media (max-width: ${mq.m}) {
      text-align: left;
    }
  `}
`

const SegmentBreakLine = styled(BreakLineMain)`
  ${ ({ theme: { mq } }) => `
    @media (max-width: ${mq.l}) {
      display: inline-block;
    }

    @media (max-width: ${mq.m}) {
      display: none;
    }
  `}
`;

const ContentContainer = styled.div`
  ${ ({ theme: { mq } }) => `
    min-height: 15vh;
    
    display: flex;
    justify-content: space-between;
      
    @media (max-width: ${mq.l}) {
      margin-top: 0;
      flex-direction: column;
      justify-content: space-between;
    }

  `}
`;

const ContentContainerColumn = styled(ContentContainer)`
  ${ ({ theme: { mq } }) => `
    min-height: 20vh;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: ${mq.l}) {
      min-height: 25vh;
    };

    @media (max-width: ${mq.m}) {
      min-height: 30vh;
    };

    @media (max-width: ${mq.s}) {
      min-height: 35vh;
    };
  `}
`;

const PremiumGallery = styled.div`
  ${ ({ theme: { space, mq } }) => `
    width: 60%;
    margin-left: calc(4 * ${space.m});

    @media (max-width: ${mq.l}) {
      width: 100%;
      margin: ${space.xl} auto;
    }
  `}
`;

const PremiumTechList = styled.ul`
  ${ ({ theme: { space, mq } }) => `
    margin: 0 ${space.xl};
    
    flex: 0 0 50%;
    list-style: none;

    @media (max-width: ${mq.l}){
      margin: ${space.l} 0 0 0;
      flex-wrap: wrap;
    }
  `}
`;

const PremiumTechItem = styled.li`
  ${ ({ theme: { color, space, font, mq } }) => `
    height: max-content;

    display: inline-block;
    margin: ${space.s} ${space.s};
    padding: ${space.s} ${space.m};
    
    background: ${color.background_2};
    
    color: white;
    font-weight: ${font.weight_bold};

    @media (max-width: ${mq.l}){
      margin: ${space.s} ${space.m} ${space.s} 0;
    }
  `}
`;

// React components
const SponsorPage = ({ sponsor, color, isFull, ...props }) => {
  const mapSocialLink = medium => {
    const mediumMapper = {
      linkedin: faLinkedin,
      github: faGithub,
      facebook: faFacebook,
      twitter: faTwitter,
      medium: faMedium
    };
    return mediumMapper[medium];
  };

  return (
    <Page title={sponsor.name} {...props}>
      <TopContainer>
        <IntroContiner>
          <HeadingContainer>
            <HeadingDecorationTriangel src={triangle} alt="triangle" />
            <PageHeading>Big Thanks to our sponsor</PageHeading>
            <BreakLineInverted />
          </HeadingContainer>

          <SponsorHeadingContainer>
            <LogoAligner>
            <SponsorLogo
              src={image(sponsor.logo, 350, 221)}
              alt={sponsor.name}
            />
            </LogoAligner>
            
            <div>
            <SponsorHeading>
              <SponsorName>{sponsor.name}</SponsorName>
              <SponsorOneliner>{sponsor.oneLiner}</SponsorOneliner>
            </SponsorHeading>
            <MiniNav>
              <MiniNavIconContainer>
                {sponsor.socials.map((social, i) => (
                  <a key={i} href={social.link} target="_blank">
                    <MiniNavIcon
                      icon={mapSocialLink(social.medium)}
                    />
                  </a>
                ))}
              </MiniNavIconContainer>
              <MiniNavLinksList>
                <li>
                  <MiniNavListItem href="#about">
                    About
                  </MiniNavListItem>
                </li>
                <li>
                  <MiniNavListItem href="#Tech-Story">
                    Tech-Story
                  </MiniNavListItem>
                </li>
                {!!sponsor.openPositions.length && (
                  <li>
                    <MiniNavListItem href="#open-positions">
                      Open Positions
                    </MiniNavListItem>
                  </li>
                )}
                {sponsor.reversimAndUs && (
                  <li>
                    <MiniNavListItem href="#reversim-and-us">
                      Reversim & Us
                    </MiniNavListItem>
                  </li>
                )}
              </MiniNavLinksList>
            </MiniNav>
            </div>
          </SponsorHeadingContainer>
          
        </IntroContiner>
      </TopContainer>
      
            
      <SponsorDescription>
        <WhoWeAre>
          <SegmentHeadingAligner id="about">
              <SegmentHeading>Who We Are?</SegmentHeading>
              <SegmentBreakLine />
            </SegmentHeadingAligner>
            <ContentContainer>
              <ReactMarkdown source={sponsor.about}></ReactMarkdown>
                {sponsor.images &&
                  sponsor.images.length > 0 && (
                    <PremiumGallery>
                      <SponsorCarousel sponsor={sponsor} />
                    </PremiumGallery>
                  )}
            </ContentContainer>
        </WhoWeAre>

        <SegmentContainer>
          <SegmentHeadingAligner id="Tech-Story">
            <SegmentHeading>Our Technology Story</SegmentHeading>
            <SegmentBreakLine />
          </SegmentHeadingAligner>
          <ContentContainer>
            <Paragraph2>{sponsor.techStory.text}</Paragraph2>
            {sponsor.techStory.technologies &&
              sponsor.techStory.technologies.length > 0 && (
                <PremiumTechList>
                  {sponsor.techStory.technologies.map(t => (
                    <PremiumTechItem key={t}>
                      {t}
                    </PremiumTechItem>
                  ))}
                </PremiumTechList>
              )}
          </ContentContainer>
        </SegmentContainer>

        {sponsor.openPositions &&
          sponsor.openPositions.length > 0 && (
            <SegmentContainer>
                <SegmentHeadingAligner id="open-positions">
                  <HeadingZigzag
                    src={zigzag}
                    alt=""
                  />
                  <SegmentHeading>Open Positions</SegmentHeading>
                  <SegmentBreakLine />
                </SegmentHeadingAligner>
                <ContentContainer>
                  {sponsor.openPositions.map((openPosition, i) => (
                    <OpenPosition
                      key={i}
                      openPosition={openPosition}
                      {...this.props}
                    />
                  ))}
                </ContentContainer>
            </SegmentContainer>
          )}
        {sponsor.reversimAndUs && (
          <SegmentContainer> 
              <SegmentHeadingAligner id="reversim-and-us">
                <SegmentHeading>
                  Reversim & Us
                </SegmentHeading>
                <SegmentBreakLine />
              </SegmentHeadingAligner>
              <Paragraph2>{sponsor.reversimAndUs}</Paragraph2>
          </SegmentContainer>
        )}
      </SponsorDescription>
    </Page>
  );
};

export default SponsorPageRoute(SponsorPage);

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
import mediaQueryMin from '../../styles/MediaQueriesMixin';

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
  PageHeading,
  BreakLineInverted,
  InvertedColorLink,
  Heading3,
  Paragraph,
  Paragraph2,
  BreakLineMain,
} from '../GlobalStyledComponents/ReversimStyledComps';

library.add(faMapMarkerAlt);

// styled-components components page's intro

const TopContainer = styled.div`
  ${({ theme: { color, space } }) => `
    width: 100%;

    margin: 0 auto calc(30 * ${space.m}) auto;
    padding: ${space.xxl} 0 ${space.xl} calc(3.5 * ${space.m});

    background-color: ${color.background_2};
  `}

    ${mediaQueryMin.m`
      padding-bottom: 0;
    `}

    ${mediaQueryMin.l`
      ${ ({ theme: { space } }) => `
      margin: 0 auto calc(15 * ${space.m}) auto;
      padding-bottom: calc(3 * ${space.m});
    `}`}

    ${mediaQueryMin.xl`
      padding-bottom: 0;
      display: flex;
      justify-content: center;
    `}
`;

const IntroContiner = styled(AlignCenterColumn)`
  margin: 0;

  ${mediaQueryMin.l`
  ${({ theme: { space } }) => `
      margin-top: ${space.xxl};
      max-width: 1150px;
  `}`}
`;

const HeadingContainer = styled(HeadingAligner)`
  ${({theme: { color, space } }) =>`
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

const SponsorHeadingContainer = styled.div`
  ${({ theme: { space, color } }) =>`
    height: 150px;
    min-height: 400px;
    padding-top: ${space.xl};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: ${color.background_2};
  `}

    ${mediaQueryMin.l`
      min-height: initial;
      flex-direction: row;
    `}
  `;

const LogoAligner = styled.div`
  align-self: baseline;
`;

const SponsorLogo = styled.img`
  ${({theme: { color } } ) => `
    max-width: 350px;
    border: 4px solid ${color.box_shadow_1};
  `}
`;

const SponsorHeading = styled.div`
  ${({ theme: { space } }) => `
    margin-left: ${space.l};
    padding-bottom: ${space.m};
  `}
`;

const SponsorName = styled(Heading3)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_medium};
    margin: 0;
  `}
`
const SponsorOneliner = styled(Paragraph)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
    font-weight: ${font.weight_medium};
    min-height: calc(4 * ${font.size_md});
  `}

  ${mediaQueryMin.m`
    min-width: 690px;
  `}

  ${mediaQueryMin.l`
    min-width: 560px;
  `}

  ${mediaQueryMin.xl`
    min-width: 755px;
  `}
`;

const MiniNav = styled.div`
  ${({ theme: { space } }) => `
    margin: ${space.xxl} 0 0 ${space.l};
  `}

    ${mediaQueryMin.l`
      ${({ theme: { space } }) => `
        margin: calc(3 * ${space.m}) 0 0 calc(2 * ${space.m});
      `}`}
`;

const MiniNavIconContainer = styled.div`
  ${({ theme: { space } }) => `
      margin-bottom: ${space.xxl};
    `}

    ${mediaQueryMin.l`
      margin-bottom: 0
    `}
`;

const MiniNavIcon = styled(FontAwesomeIcon)`
  ${({ theme: { font, space, color } }) =>`
    font-size: ${font.size_bg};
    margin-right: ${space.xl};
    color: ${color.font_awsome_nav};
  `}

    ${mediaQueryMin.l`
      ${({ theme: { font } }) =>`
      font-size: ${font.size_bg};
    `}`}
`;

const MiniNavLinksList = styled.ul`
  ${({ theme: { space } }) => `
    max-width: 90%;
    min-height: 20vh;

    margin: ${space.m} 0;

    display: flex;
    flex-direction: column;
  `}

    ${mediaQueryMin.l`
      flex-direction: row
      flex-wrap: wrap;
      min-height: 50px;
    `}
`;

const MiniNavListItem = styled(InvertedColorLink)`
  ${({ theme: { space, font } }) => `
  margin-right: ${space.l};
  font-size: ${font.size_bg};
  `}

  ${mediaQueryMin.l`
    ${({ theme: { font } }) => `
      font-size: ${font.size_md};
  `}`}
`;

// styled-components sponsor description section

const SponsorDescription = styled(AlignCenterColumn)`
    padding: 0;

    ${mediaQueryMin.m`
      ${({ theme: { space } }) =>`
        margin-left: ${space.m};
    `}`}

    ${mediaQueryMin.l`
      ${({ theme: { space, width } }) =>`
        margin-top: ${space.xxl};
        margin-left: ${space.xxl};
        max-width: ${width.main_for_mq_l};
      `}`}

    ${mediaQueryMin.xl`
      ${({ theme: { width } }) =>`
        max-width: ${width.main_for_mq_xl};
        margin: 0 auto;
    `}`}
`;

const SegmentContainer = styled.div`
  ${({ theme: { space } }) => `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 660px;
    margin-bottom: calc(2 * ${space.xxl});
  `}

    ${mediaQueryMin.m`
      min-height: 20vh;

      flex-direction: column;
      justify-content: space-between;
      `}

    ${mediaQueryMin.l`
      ${ ({ theme: { width } }) => `
      max-width: ${width.main_for_mq_xl};
      `}`}
`;

const WhoWeAre = styled(SegmentContainer)`
  justify-content: center;
    ${mediaQueryMin.m`
      justify-content: space-between;
    `}
`;

const SegmentHeadingAligner = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    margin-bottom: 0;
    margin-top: calc(-13 * ${space.m});
    padding-top: calc(13 * ${space.m});
    z-index: -1;
    `}

    ${mediaQueryMin.l`
      ${({theme: { space } }) => `
      margin-top: calc(-13 * ${space.m});
      `}`}
`;

const SegmentHeading = styled(Heading3)`
  ${({ theme: { color, font } }) => `
    color: ${color.text_3};
    font-weight: ${font.weight_medium};
    text-align: left;
    `}
`

const SegmentBreakLine = styled(BreakLineMain)`
  display: none;

  ${mediaQueryMin.s`
    display: inline-block;
  `}
`;

const ContentContainer = styled.div`
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  flex-direction: column;

  ${mediaQueryMin.xl`
  flex-direction: row;
  `}
`;

const PremiumGallery = styled.div`
  ${({ theme: { space } }) => `
    width: 100%;
    margin: ${space.xl} auto;
    `}

    ${mediaQueryMin.xl`
      ${({ theme: { space } }) => `
        width: 90%;
        margin-left: calc(4 * ${space.m});
      `}`} /*NOTE: There is a height issue of the carousel which I couldn't solve in min-width 992px*/
`;

const PremiumTechList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.l} 0 0 0;
    flex-wrap: wrap;
    list-style: none;
    flex: 0 0 50%;
    `}

    ${mediaQueryMin.l`
      ${({ theme: { space } }) => `
      margin: 0 ${space.xl};
    `}`}
`;

const PremiumTechItem = styled.li`
  ${({ theme: { color, space, font } }) => `
    height: max-content;

    display: inline-block;
    margin: ${space.s} ${space.m} ${space.s} 0;
    padding: ${space.s} ${space.m};

    background: ${color.background_2};

    color: white;
    font-weight: ${font.weight_bold};
    `}

    ${mediaQueryMin.l`
      ${({ theme: { space } }) => `
      margin: ${space.s} ${space.s};
    `}`}
`;

// React components
const SponsorPage = ({ sponsor, ...props }) => {
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
            <HeadingTriangle src={triangle} alt="triangle" />
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
                  <MiniNavListItem href="#tech-Story">
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
          <SegmentHeadingAligner id="tech-Story">
            <SegmentHeading>Our Technology Story</SegmentHeading>
            <SegmentBreakLine />
          </SegmentHeadingAligner>
          <ContentContainer>
            <Paragraph2>{sponsor.techStory.text}</Paragraph2>
            {sponsor.techStory.technologies &&
              sponsor.techStory.technologies[0].length > 0 && (
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

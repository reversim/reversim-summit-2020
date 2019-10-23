/* eslint-disable prettier/prettier */
// This component is responsible for the sponsors' pages. It renders OpenPosition.jsx
// and SponsorsCarousel.jsx

import React from 'react';
import styled from 'styled-components';
import SponsorPageRoute from '../SponsorPageRoute';

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
  faRProject
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  AlignCenter,
  HeadingAligner,
  HeadingTriangle,
  Heading2,
  WhiteLine,
  Heading3,
  Paragraph,
  Paragraph2,
  BreakLine
} from '../GlobalStyledComponents/ReversimStyledComps';

import {Link as ScrollLink } from "react-scroll";

library.add(faMapMarkerAlt);

// styled-components components page's intro

const TopContainer = styled.div`
  ${ ({ theme: { color, space } }) => `
    width: 100%;

    margin: 0 auto;
    padding-top: calc(10 * ${space.m});

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;

    background-color: ${color.background_2};
  `}
`;

const IntroContiner = styled(AlignCenter)`
  ${ ({ theme: { mq, space } }) => `
    @media (min-width: ${mq.l}){
      margin-top: ${space.xxl};
      max-width: 1150px;
    }
  `}
`;

const HeadingContainer = styled(HeadingAligner)`
  ${ ({theme: { color, space, mq } }) =>`
    padding-top: ${space.xxl};
    background-color: ${color.background_2};
    margin-bottom: 0;
    
    @media (min-width: ${mq.xl}){
      max-width: ${mq.xl}; 
    }
  `}
`;

const PageHeading = styled(Heading2)`
  ${ ({ theme: { color } }) => `
    color: ${color.text_1};
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

const SponsorLogo = styled.img`
  ${( {theme: { color } } ) => `
    max-width: 350px;
    flex-basis: 100%;
    border: 4px solid ${color.box_shadow_1};
    position: relative;
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
    font-weight: ${font.weight_med};
    margin: 0;
  `}
`
const SponsorOneliner = styled(Paragraph)`
  ${ ({ theme: { font } }) => `
    font-size: ${font.size_md};
    font-weight: ${font.weight_med};
  `}
`;

const MiniNav = styled(AlignCenter)`
  ${ ({ theme: { color, space, mq } }) => `
    position: relative;
    left: 370px;
    width: 30%;
    
    padding-top: calc(2 * ${space.m});
    margin-left: calc(6 * ${space.l} + ${space.s});
    
    display: block;

    @media (max-width: ${mq.l}){
      width: 100%;
      position: static;
      margin-left: calc(5 * ${space.xl});
      padding: calc(2 * ${space.l});
    }

  `}
`;

const MiniNavIcon = styled(FontAwesomeIcon)`
  ${ ({ theme: { font, space, color } }) =>`
    font-size: ${font.size_bg};
    margin-right: ${space.xl};
    color: ${color.font_awsome_nav};
  `}
`;

const MiniNavLinksList = styled.ul`
  ${ ({ theme: { space, mq } }) => `
    margin: 10px 0 0;

    display: flex;
    justify-content: space-between;
    
    @media (max-width: ${mq.l}) {
      flex-direction: column;
    }
  `}
    
`;

// styled-components sponsor description section

const SponsorDescription = styled(AlignCenter)`
  ${({ theme: { space, mq } }) => `
    margin: 0 auto;
    margin-top: ${space.m};

    @media (min-width: ${mq.l}){
      margin-top: ${space.xxl};
      max-width: 1150px;
    }
  `}
`;

const SegmentContainer = styled.div`
  ${ ({ theme: { space, mq } }) => `
    display: flex;
    flex-direction: column
    justify-content: space-between;
    margin-bottom: ${space.xxl};
      
    @media (max-width: ${mq.l}) {
      min-height: 20vh;      

      flex-direction: column;
      justify-content: space-between;
    }
    @media (max-width: ${mq.s}){
      max-width: 400px;
      justify-content: center;
    }
  `}
`;

const SegmentHeadingAligner = styled(HeadingAligner)`
  margin-bottom: 0;
`;

const SegmentHeading = styled(Heading3)`
  ${ ({ theme: { color, font, mq } }) => `
    color: ${color.text_3};
    font-weight: ${font.weight_med};

    @media (max-width: ${mq.m}) {
      text-align: left;
    }
  `}
`

const SegmentBreakLine = styled(BreakLine)`
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

const PremiumTechList = styled.div`
  ${ ({ theme: { space, mq } }) => `
    flex: 0 0 50%;
    margin: ${space.xl} auto 0 auto;
  `}
`;

// React component
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
            <HeadingTriangle src={triangle} alt="triangle" />
            <PageHeading>Big Thanks to our sponsor</PageHeading>
            <WhiteLine />
          </HeadingContainer>

          <SponsorHeadingContainer>
            <div>
            <SponsorLogo
              src={image(sponsor.logo, 350, 221)}
              alt={sponsor.name}
            />
            </div>
            
            <div>
            <SponsorHeading>
              <SponsorName>{sponsor.name}</SponsorName>
              <SponsorOneliner>{sponsor.oneLiner}</SponsorOneliner>
            </SponsorHeading>         
            </div>
          </SponsorHeadingContainer>
          
        </IntroContiner>
      </TopContainer>
      <MiniNav>
          <div>
            {sponsor.socials.map((social, i) => (
              <a key={i} href={social.link} target="_blank">
                <MiniNavIcon
                  icon={mapSocialLink(social.medium)}
                />
              </a>
            ))}
          </div>
          <MiniNavLinksList>
            <li>
              <ScrollLink href="#" to={"about"} offset={-100}>
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink href="#" to={"Tech-Story"} offset={-100}>
                Tech-Story
              </ScrollLink>
            </li>
            {!!sponsor.openPositions.length && (
              <li>
                <ScrollLink href="#" to={"open-positions"} offset={-100}>
                  Open Positions
                </ScrollLink>
              </li>
            )}
            {sponsor.reversimAndUs && (
              <li>
                <ScrollLink href="#" to={"reversim-and-us"} offset={-100}>
                  Reversim & Us
                </ScrollLink>
              </li>
            )}
          </MiniNavLinksList>
      </MiniNav>
            
      <SponsorDescription>
        <SegmentContainer>
          <SegmentHeadingAligner name="about">
              <SegmentHeading>Who We Are?</SegmentHeading>
              <SegmentBreakLine />
            </SegmentHeadingAligner>
            <ContentContainer>
              <Paragraph2>{sponsor.about}</Paragraph2>
                {sponsor.images &&
                  sponsor.images.length > 0 && (
                    <PremiumGallery>
                      <SponsorCarousel sponsor={sponsor} />
                    </PremiumGallery>
                  )}
            </ContentContainer>
        </SegmentContainer>

        <SegmentContainer>
          <SegmentHeadingAligner name="Tech-Story">
            <SegmentHeading>Our Technology Story</SegmentHeading>
            <SegmentBreakLine />
          </SegmentHeadingAligner>
          <ContentContainerColumn>
            <Paragraph2>{sponsor.techStory.text}</Paragraph2>

            {sponsor.techStory.technologies &&
              sponsor.techStory.technologies.length > 0 && (
                <PremiumTechList>
                  {sponsor.techStory.technologies.map(t => (
                    <div className="premium-tech-item" key={t}>
                      {t}
                    </div>
                  ))}
                </PremiumTechList>
              )}
          </ContentContainerColumn>
        </SegmentContainer>

        {sponsor.openPositions &&
          sponsor.openPositions.length > 0 && (
            <SegmentContainer> {/*Section container */}
              <section name="open-positions"> {/*Section container */}
                <div className="d-flex align-items-center mb-8 mt-12"> {/*NOTE: Heading contianer*/}
                  <img
                    src={zigzag}
                    alt=""
                    height="80"
                    style={{ marginRight: -11 }}
                  />
                  <h3 className="text-purple2 font-size-xl mr-4"> {/**Heading */}
                    Open Positions
                  </h3>
                  <div className="flex-grow-1 border-bottom border-purple2" /> {/**Breakline */}
                </div>
                <div className="premium-positions"> {/*Content container */}
                  {sponsor.openPositions.map((openPosition, i) => (
                    <OpenPosition
                      key={i}
                      openPosition={openPosition}
                      {...this.props}
                    />
                  ))}
                </div>
              </section>
            </SegmentContainer>
          )}
        {sponsor.reversimAndUs && (
          <SegmentContainer name="reversim-and-us"> 
              <SegmentHeadingAligner>
                <SegmentHeading>
                  Reversim & Us
                </SegmentHeading>
                <SegmentBreakLine />
              </SegmentHeadingAligner>
              <p className="premium-text">{sponsor.reversimAndUs}</p>
          </SegmentContainer>
        )}
      </SponsorDescription>
    </Page>
  );
};

export default SponsorPageRoute(SponsorPage);

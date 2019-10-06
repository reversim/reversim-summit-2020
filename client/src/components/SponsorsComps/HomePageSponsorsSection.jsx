/* eslint-disable prettier/prettier */
import React from "react";
import styled from 'styled-components';

import HomeCommunitySponsors from "./HomeCommunitySponsors";
import {
  Container,
  BreakLine,
} from '../GlobalStyledComponents/ReversimStyledComps'
import HomePremiumSponsors from './HomePremiumSponsors'

// Styled-components section

const SponserSectionContainter = styled(Container)`
  margin-top: 80px;
  margin-bottom: 100px;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const HeadingAlinger = styled.div`
  ${ ( { theme: { space } } ) => `
    width: 100%;
    display: flex;
    align-items: baseline;
    margin-bottom: ${space.xxl};
  `}
`;

const Heading = styled.h2`
  ${ ( { theme: { color, font } } ) => `
        width: inherit;
        position: relative;
        z-index: 1;
        text-align: center;
        font-weight: ${font.weight_normal};
        font-family: ${font.main};
        font-size: ${font.size_h2};
        color: ${color.heading_2};
      `}
`;

const PremiunSponsorsSection = styled.section`
  ${ ( { theme: { mq } } ) => `
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      
      @media (max-width: ${mq.l}) {
        justify-content: space-around;
      }
    `}
`;

const CommunitySponsorsSection = styled.section`
${ ( { theme: { space, mq } } ) =>`
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: ${space.xl};
      @media (max-width: ${mq.l}) {
        justify-content: space-around;
      }
    `}
`;

// React components section

const HomePageSponsorsSection = ({ sponsors }) => {
  return (
    <SponserSectionContainter>
      <HeadingAlinger>
        <Heading>Meet Our Sponsors</Heading>
        <BreakLine />

      </HeadingAlinger>
        <PremiunSponsorsSection>
          <HomePremiumSponsors sponsors={sponsors} />
        </PremiunSponsorsSection>
        <BreakLine /> 

        <CommunitySponsorsSection> {/* NOTE: This is not shown when screen width is under 992px couldn't figure out why */}
          <HomeCommunitySponsors sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}/>
        </CommunitySponsorsSection>
      
    </SponserSectionContainter>
);
};

export default HomePageSponsorsSection;
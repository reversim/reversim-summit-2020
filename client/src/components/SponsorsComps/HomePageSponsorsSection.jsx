/* eslint-disable prettier/prettier */
import React from "react";
import styled from 'styled-components';

import CommunitySponsorsSection from "./CommunitySponsorsSection";
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
        text-align: center;
        font-weight: ${font.weight_normal};
        font-family: ${font.main};
        font-size: ${font.size_h2};
        color: ${color.heading_2};
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

      <HomePremiumSponsors sponsors={sponsors} />
      <BreakLine /> 

      <CommunitySponsorsSection sponsors={sponsors.filter(sponsor => !sponsor.isPremium)} />
    </SponserSectionContainter>
  );
};

export default HomePageSponsorsSection;
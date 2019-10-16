/* eslint-disable prettier/prettier */
import React from "react";
import styled from 'styled-components';

import CommunitySponsorsSection from "./CommunitySponsorsSection";
import HomePremiumSponsors from './HomePremiumSponsors';

import {
  Container,
  HeadingAligner,
  HeadingDiamond,
  Heading2,
  BreakLine
} from '../GlobalStyledComponents/ReversimStyledComps';


import diamond from '../../images/SVG/diamond.svg';

// Styled-components section

const SponserSectionContainter = styled(Container)`
  margin-top: 80px;
  margin-bottom: 100px;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const BottomLine = styled(BreakLine)`
  width: 100%;
`;

// React components section

const HomePageSponsorsSection = ({ sponsors }) => {
  return (
    <SponserSectionContainter>
      <HeadingAligner>
        <HeadingDiamond src={diamond} alt="diamond" />
        <Heading2>Meet Our Sponsors</Heading2>
        <BreakLine />
      </HeadingAligner>

      <HomePremiumSponsors sponsors={sponsors} />
      <BottomLine /> 

      <CommunitySponsorsSection sponsors={sponsors.filter(sponsor => !sponsor.isPremium)} />
    </SponserSectionContainter>
  );
};

export default HomePageSponsorsSection;
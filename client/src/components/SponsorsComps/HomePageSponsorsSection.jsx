/* eslint-disable prettier/prettier */
import React from "react";
import HomeCommunitySponsors from "../HomeCommunitySponsors";
import { SponsorMiniPremium } from '../Sponsors';
import styled from 'styled-components';
import {
  Container,
  BreakLine,
} from '../GlobalStyledComponents/ReversimStyledComps'

const SponserSectionContainter = styled(Container)`
  margin-top: 80px;
  margin-bottom: 100px; 
`;

const HeadingAlinger = styled.div`
  ${props => {
      return(`
        width: 100%;
        display: flex;
        align-items: baseline;
        margin-bottom: ${props.theme.space.xxl};
      `)
    }}
  `;

const Heading = styled.h2`
  ${props => {
      const {
        color,
        font,
      } = props.theme;
      
      return(`
        position: relative;
        z-index: 1;
        text-align: center;
        font-weight: ${font.weight_normal};
        font-family: ${font.main};
        font-size: ${font.size_h2};
        color: ${color.heading_2};
      `)
  }}
`;

const HomeSponsors = styled.div`
  ${props => {
        return(`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          
          @media (max-width: ${props.theme.mq.l}) {
            justify-content: space-around;
          }
        `)
    }}
`;

const CommunitySponsorsHome = styled.div`
  ${props => {
        const {
          space,
          mq,
        } = props.theme;
        
        return(`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: ${space.xl};
          @media (max-width: ${mq.l}) {
            justify-content: space-around;
          }
        `)
    }}
`;

const SponsorsSection = ({ sponsors }) => {
  return (
    <SponserSectionContainter>
      <HeadingAlinger>
        <Heading>Meet Our Sponsors</Heading>
          <BreakLine />
      </HeadingAlinger>
      
        <HomeSponsors>
          {sponsors
            .filter(sponsor => sponsor.isPremium)
            .map((sponsor, i) => {
              return (
                <div key={i}>
                  <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
                </div>
                );
          })}
        </HomeSponsors>
        <BreakLine /> 
        <CommunitySponsorsHome> {/* NOTE: This is not shown when screen width is under 992px couldn't figure out why */}
          <HomeCommunitySponsors sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}/>
        </CommunitySponsorsHome>
      
    </SponserSectionContainter>
);
};

export default SponsorsSection;
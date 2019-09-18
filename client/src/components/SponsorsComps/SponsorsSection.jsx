import React from "react";
import s from "../Sponsors.css";
// import { Container } from "reactstrap";
import HomeCommunitySponsors from "../HomeCommunitySponsors";
import cn from "classnames";
import { SponsorMiniPremium } from '../Sponsors';
import styled from 'styled-components';
import { Container } from '../GlobalStyledComponents/ReversimStyledComps'

const SponserSectionContainter = styled(Container)`
  margin-top: 80px;
  margin-bottom: 100px; 
  /* Consider theming somehow */
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
        font-family: ${font.main};
        font-size: ${font.size_h2};
        color: ${color.heading_2};
      `)
  }}
`;

const BreakLine = styled.hr`
  ${props => {
      const {
      color,
      space,
      } = props.theme;
      
      return(`
        flex-grow: 1;
        height: 2px;
        align-self: center;
        margin-left: ${space.m};
        background-color: ${color.background_2};
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
          <div className="">
            <div className="home-sponsors d-flex flex-wrap">
              {sponsors
                .filter(sponsor => sponsor.isPremium)
                .map((sponsor, i) => {
                  return (
                    <div key={i}>
                        <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
                    </div>
                  );
                })}
            </div>
            <div className="hl mt-6 mb-12 bg-purple2" />
              <div className={cn("d-flex flex-wrap mt-6", s.communitySponsorsHome)}> {/* NOTE: This is not shown when screen width is under 992px */}
                {/* {sponsors
                .filter(sponsor => !sponsor.isPremium)
                .map((sponsor, i) => {
                    return (
                    <div key={i}>
                        <SponsorMini key={sponsor._id} {...sponsor} /> /* NOTE: SponsorMini is not defined. check if It could and should be imported from anywhere.
                    </div>
                    );
                })} */}
                <HomeCommunitySponsors sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}/>
              </div>
              {/* <WantToBe /> */} {/* NOTE: DO NOT DELETE but consider changing color since it's white on white */}
            </div>
        </SponserSectionContainter>
);
};

export default SponsorsSection;
/* eslint-disable prettier/prettier */
import React from 'react';
import styled from "styled-components";

import { hyperlink } from "../../utils";
import { image } from "../../images";
import mediaQueryMin from '../../styles/MediaQueriesMixin';

// Styled-component Section

const Container = styled.div`
${({ theme: { space } } ) =>`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: ${space.xl};
  `}

  ${mediaQueryMin.l`
    justify-content: space-between;
    `}
`;

const HomeCommunityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  ${mediaQueryMin.s`
    justify-content: space-between;
    `}
`;

const SponsorMiniContainer = styled.div`
  ${({ theme: { space } }) => `
    flex: 0 0 20%;
    text-align: center;
    align-self: center;

    margin: 0 ${space.l};
  `}
`;

const SponsorMiniLink = styled.a`
  min-width: 150px;
  min-height: 110px;

  position: relative;
  display: inline-block;
  
  cursor: pointer;
  transition: opacity 300ms linear;
  
  &:hover{
    opacity: 0.5;
  }
`;

const SponsorMiniImg = styled.img`
  max-width: 100%;
  padding: ${props => props.theme.space.s};
  max-height: 100px;
`;

// React components section

const sponsorsOrder = [
  'Gett', 'Liveperson', 'Oracle', 'Chegg',
  'Joytunes', 'Trax', 'CyberArk', 'Cloudinary',
  'Zebra', 'eko', 'Cellebrite', 'Kenshoo',
  'Bizzabo', 'Wework', 'ThetaRay', 'Tipalti'
];

const orderSponsors = (sponsors) => {
  let orderedSponsors = []
  
  sponsorsOrder.forEach((key) => {
    orderedSponsors.push(sponsors.find((sponsor) => sponsor.name === key))
  })
  
  return orderedSponsors
}

const SponsorMini = ( props ) => {
  const { 
    name,
    logo,
    url
  } = props;
    
  return (
    <SponsorMiniLink 
      href={hyperlink(url)}
      target="_blank"
    >
        <SponsorMiniImg
          src={image(logo, 350, 230)}
          alt={name}
        />
    </SponsorMiniLink>
  );
};

const CommunitySponsorsSection = ({sponsors}) => {

  return (
    <Container>
      <HomeCommunityContainer>
      {
        sponsors.map((sponsor, i) => {
          return (
            <SponsorMiniContainer key={i} {...sponsor}>
              <SponsorMini key={i} {...sponsor} />
            </SponsorMiniContainer>
          );
        })
      }
      </HomeCommunityContainer>
    </Container>
  );
};

export default CommunitySponsorsSection;

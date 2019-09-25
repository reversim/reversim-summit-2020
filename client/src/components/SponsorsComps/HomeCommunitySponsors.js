import React from 'react';
import { HashLink } from "react-router-hash-link";
import { hyperlink } from "../../utils";
import { image } from "../../images";
import styled from "styled-components";

// Styled-component Section

const SponsorMiniContainer = styled.a`
  min-width: 150px;
  min-height: 150px;

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
  let orderdSponsors = []
  sponsorsOrder.forEach((key) => {
    orderdSponsors.push(sponsors.find((sponsor) => sponsor.name === key))
  })
  return orderdSponsors
}


class SponsorMini extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { name, logo, url } = this.props;
    return (
      <SponsorMiniContainer href={hyperlink(url)} target="_blank">
        {/*<HashLink smooth to={`/sponsors#${name}`}>*/}
          <SponsorMiniImg
            src={image(logo, 350, 230)}
            alt={name}
          />
        {/*</HashLink>*/}
      </SponsorMiniContainer>
    );
  }
}
const HomeCommunitySponsors = ({sponsors}) => {
  return (
    <div className='home-sponsors d-flex flex-wrap'>
    {orderSponsors(sponsors)
      .map((sponsor, i) => {
        return (
          <div className="sponsor-community-mini mx-4" key={i}>
            <SponsorMini key={i} {...sponsor} />
          </div>
        );
      })}
    </div>
  );
};

export default HomeCommunitySponsors;

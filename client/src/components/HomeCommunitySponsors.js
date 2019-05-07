import React from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import { HashLink } from "react-router-hash-link";
import s from "./Sponsors.css";
import { hyperlink } from "../utils";
import { image } from "../images";

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
      <div
        className="p-relative d-inline-block"
      >
        <a href={hyperlink(url)} target="_blank">
        {/*<HashLink smooth to={`/sponsors#${name}`}>*/}
          <img
            src={image(logo, 350, 230)}
            className={s.sponsorImg}
            alt={name}
            style={{maxHeight: 100 }}
          />
        {/*</HashLink>*/}
        </a>
      </div>
    );
  }
}
const HomeCommunitySponsors = ({sponsors}) => {
  return (
    <div className='home-sponsors d-flex flex-wrap mobile-flex-column'>
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

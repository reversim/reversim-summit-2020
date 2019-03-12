import React from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import { HashLink } from "react-router-hash-link";
import s from "./Sponsors.css";
import gett from '../images/community/home-gett.png';
import liveperson from '../images/community/home-liveperson.png';
import bizzabo from '../images/community/home-bizzabo.png';
import tipalti from '../images/community/home-tipalti.png';
import joytunes from '../images/community/home-joytunes.png';
import cloudinary from '../images/community/home-cloudinary.png';
import oracle from '../images/community/home-oracle.png';
import chegg from '../images/community/home-chegg.png';
import cyberark from '../images/community/home-cyberark.png';

const sponsors= [
  {logo:gett, name:'Gett'},
  {logo:liveperson, name:'Liveperson'},
  {logo:bizzabo, name:'Bizzabo'},
  {logo:tipalti, name:'Tipalti'},
  {logo:joytunes, name:'Joytunes'},
  {logo:cloudinary, name:'Cloudinary'},
  {logo:oracle, name:'Oracle'},
  {logo:chegg, name:'Chegg'},
  {logo:cyberark, name:'Cyberark'},
];


class SponsorMini extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { name, logo } = this.props;
    return (
      <div
        className="p-relative d-inline-block"
      >
        <HashLink smooth to={`/sponsors#${name}`}>
          <img
            src={logo}
            className={s.sponsorImg}
            alt={name}
            style={{ maxWidth: 200, maxHeight: 100 }}
          />
        </HashLink>
      </div>
    );
  }
}
const HomeCommunitySponsors = () => {
  return (
    <div className='home-sponsors d-flex flex-wrap'>
    {sponsors
      .map((sponsor, i) => {
        return (
          <div className="sponsor-community-mini" key={i}>
            <SponsorMini key={i} {...sponsor} />
          </div>
        );
      })}
    </div>
  );
};

export default HomeCommunitySponsors;
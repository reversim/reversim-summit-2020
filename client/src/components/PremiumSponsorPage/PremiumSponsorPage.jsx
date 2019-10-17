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

import { AlignCenter } from '../GlobalStyledComponents/ReversimStyledComps';

import {Link as ScrollLink } from "react-scroll";
import { Container } from "reactstrap";

import ReactMarkdown from "react-markdown";

import cn from "classnames";
import s from "../Sponsors.css";

library.add(faMapMarkerAlt);

// styled-components components

const HeaderContainer = styled(AlignCenter)`
  display: block;
`;

const PremiumDetailsContainer = styled(AlignCenter)`
  ${ ({ theme: { space, mq } }) => `
    margin-left: calc(45 * ${space.m});
    padding-top: calc(2 * ${space.m});
    display: block;

    @media (max-width: ${mq.l}){
      margin: 0 auto;
    }
  `}
`;// missing media queries for bigger screens than 1400px

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
      <div className="page__hero bg-purple2"> {/*NOTE: don't forget to change this as well */}
        <HeaderContainer>
          <div className="d-flex justify-content-center mt-15 mb-12">
            <img src={triangle} className={s.triangle} alt="diamond" />
            <div className={cn("font-size-xxl text-white")}>
              Big Thanks to our sponsor
            </div>
            <div className="bg-white hl" />
          </div>

          <div className="premium-intro">
            <div className="premium-logo">
              <img
                src={image(sponsor.logo, 350, 221)}
                alt={sponsor.name}
                style={{ maxWidth: 350 }}
              />
            </div>
            <article className="premium-intro-content">
              <div className="premium-name">{sponsor.name}</div>
              <p className="premium-oneliner">{sponsor.oneLiner}</p>
            </article>
          </div>
        </HeaderContainer>
      </div>
      <PremiumDetailsContainer>
          <div>
            {sponsor.socials.map((social, i) => (
              <a key={i} href={social.link} target="_blank">
                <FontAwesomeIcon
                  className="premium-social-icon mr-5 text-purple2"
                  icon={mapSocialLink(social.medium)}
                />
              </a>
            ))}
          </div>
          <ul className="premium-internal-links">
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
          </ul>
      </PremiumDetailsContainer>
      <AlignCenter>
        <div className="premium-pr premium-mr">
          <section className="premium-who" name="about">
            <div className="d-flex">
              <h3 className="font-size-xl text-purple2">Who We Are?</h3>
              <div className="hl bg-purple2" />
            </div>
            <ReactMarkdown className="premium-text" source={sponsor.about}></ReactMarkdown>
          </section>
          {sponsor.images &&
            sponsor.images.length > 0 && (
              <section className="premium-gallery">
                <SponsorCarousel sponsor={sponsor} />
              </section>
            )}
        </div>
        <div className="premium-mr premium-tech">
          <div className={cn("d-flex", s.premiumSection)} name="Tech-Story">
            <h3 className="font-size-xl text-purple2">Our Technology Story</h3>
            <div className="hl bg-purple2" />
          </div>
          <div className="premium-tech-story">
            <p className="premium-text">{sponsor.techStory.text}</p>

            {sponsor.techStory.technologies &&
              sponsor.techStory.technologies.length > 0 && (
                <div className="premium-tech-list">
                  {sponsor.techStory.technologies.map(t => (
                    <div className="premium-tech-item" key={t}>
                      {t}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        {sponsor.openPositions &&
          sponsor.openPositions.length > 0 && (
            <div className="premium-mr">
              <section name="open-positions">
                <div className="d-flex align-items-center mb-8 mt-12">
                  <img
                    src={zigzag}
                    alt=""
                    height="80"
                    style={{ marginRight: -11 }}
                  />
                  <h3 className="text-purple2 font-size-xl mr-4">
                    Open Positions
                  </h3>
                  <div className="flex-grow-1 border-bottom border-purple2" />
                </div>
                <div className="premium-positions">
                  {sponsor.openPositions.map((openPosition, i) => (
                    <OpenPosition
                      key={i}
                      openPosition={openPosition}
                      {...this.props}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        {sponsor.reversimAndUs && (
          <div className="premium-mr">
            <section name="reversim-and-us">
              <div className="d-flex align-items-center mb-4 mt-12">
                <h3 className="text-purple2 font-size-xl mr-4">
                  Reversim & Us
                </h3>
                <div className="flex-grow-1 border-bottom border-purple2" />
              </div>
              <p className="premium-text">{sponsor.reversimAndUs}</p>
            </section>
          </div>
        )}
      </AlignCenter>
    </Page>
  );
};

export default SponsorPageRoute(SponsorPage);

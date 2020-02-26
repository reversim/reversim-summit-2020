import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTwitterSquare,
  faGithubSquare,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';

import mediaQueryMin from '../../styles/MediaQueriesMixin';

//styled-components components

const SocialLinksContainer = styled.div`
  ${({ theme: { space } }) => `
      display: flex;
      align-items: center
      margin: 0 0 ${space.xxl} calc(2 * ${space.m});
      align-self: flex-start;
    `}
    ${mediaQueryMin.s`
      ${({ theme: { space } }) => `
        margin: 0 0 ${space.xxl} calc(8 * ${space.m});
      `}
    `}
    ${mediaQueryMin.m`
      ${({ theme: { space } }) => `
        position: relative;
        left: calc(28 * ${space.m});
        bottom: calc(6 * ${space.m});
      `}
    `}
    ${mediaQueryMin.l`
      ${({ theme: { space } }) => `
        left: calc(24 * ${space.m});
        bottom:  calc(13 * ${space.m});  
        margin-bottom: 0;
      `}
    `}
`;

const SocialLinkIcon = styled(FontAwesomeIcon)`
  ${({ theme: { font, space, color } }) =>`
    font-size: ${font.size_bg};
    margin-right: ${space.xl};
    color: ${color.font_awsome_nav};
  `}
  ${mediaQueryMin.m`
    ${({ theme: { color } }) => `
      color: ${color.text_1};
    `}
  `}
  ${mediaQueryMin.l`
    ${({ theme: { color } }) => `
      color: ${color.font_awsome_nav};
    `}
  `}
`;

//React components

const icons = {
  twitter: faTwitterSquare,
  linkedin: faLinkedin,
  github: faGithubSquare,
  stackOverflow: faStackOverflow,
};

const hrefs = {
  twitter: x => `https://twitter.com/${x}`,
  linkedin: x => x,
  github: x => `https://github.com/${x}`,
  // stackOverflow: x => x,
};

const socialNetworks = ['twitter', 'linkedin', 'github', 'stackOverflow'];


const IconLink = ({href, icon}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <SocialLinkIcon icon={icon} />
  </a>
);

const SpeakerSocialLink = ({type, value}) => (
  <IconLink href={hrefs[type](value)} icon={icons[type]} />
);

const SpeakerSocialLinks = props => {
  const links = socialNetworks
    .filter(type => !!props[type])
    .map(type => (
      <SpeakerSocialLink type={type} value={props[type]} key={`${type}_${props[type]}`} iconClassName={props.iconClassName}/>
    ));

  return <SocialLinksContainer>{links}</SocialLinksContainer>;
};

export default SpeakerSocialLinks;

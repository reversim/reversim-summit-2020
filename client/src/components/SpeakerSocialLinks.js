import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedin, faTwitterSquare, faGithubSquare, faStackOverflow} from '@fortawesome/free-brands-svg-icons';

import mediaQueryMin from '../styles/MediaQueriesMixin';

import cn from 'classnames';

//styled-components components

const SocialLinksContainer = styled.div`
  ${({ theme: { space } }) => `
      display: flex;
      align-items: center
      margin-bottom: ${space.xxl};
    `}

    ${mediaQueryMin.l`
      margin-bottom: 0
    `}
`;

const SocialLinkIcon = styled(FontAwesomeIcon)`
  ${({ theme: { font, space, color } }) =>`
    font-size: ${font.size_xl};
    margin-right: ${space.xl};
    color: ${color.font_awsome_nav};
  `}
    
    ${mediaQueryMin.l`
      ${({ theme: { font } }) =>`
      font-size: ${font.size_bg};
    `}`}
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


const IconLink = ({href, icon, className, isLarge: _isLarge}) => (
  <a
    className={cn('text-purple2', className)}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    <FontAwesomeIcon icon={icon} />
  </a>
);

const SpeakerSocialLink = ({type, value, iconClassName}) => (
  <IconLink href={hrefs[type](value)} icon={icons[type]} className={cn("social-icon-link ml-2 mr-2 d-flex", iconClassName)} />
);

const SpeakerSocialLinks = props => {
  const links = socialNetworks
    .filter(type => !!props[type])
    .map(type => (
      <SpeakerSocialLink type={type} value={props[type]} key={`${type}_${props[type]}`} iconClassName={props.iconClassName}/>
    ));

  return <SocialLinksContainer className={cn(props.className, 'speaker-page__social-links d-flex align-items-center')}>{links}</SocialLinksContainer>;
};

export default SpeakerSocialLinks;

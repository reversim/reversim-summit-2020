import React from 'react';
import IconLink from './IconLink';
import {faLinkedin, faTwitterSquare, faGithubSquare, faStackOverflow} from '@fortawesome/free-brands-svg-icons';

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
  stackOverflow: x => x,
};

const SpeakerSocialLink = ({type, value}) => (
  <IconLink href={hrefs[type](value)} icon={icons[type]} className="social-icon-link mr-7 d-flex" />
);

export default SpeakerSocialLink;

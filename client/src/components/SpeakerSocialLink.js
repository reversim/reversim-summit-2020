import React from 'react';
import IconLink from './IconLink';
import {faLinkedin, faTwitterSquare, faGithubSquare, faStackOverflow} from '@fortawesome/free-brands-svg-icons';
import cn from "classnames";

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

const SpeakerSocialLink = ({type, value, iconClassName}) => (
  <IconLink href={hrefs[type](value)} icon={icons[type]} className={cn("social-icon-link ml-2 mr-2 d-flex", iconClassName)} />
);

export default SpeakerSocialLink;

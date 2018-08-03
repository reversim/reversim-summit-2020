import React from 'react';
import IconLink from './IconLink';

const icons = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  github: 'github',
  stackOverflow: 'stack-overflow',
};
const hrefs = {
  twitter: x => `https://twitter.com/${x}`,
  linkedin: x => x,
  github: x => `https://github.com/${x}`,
  stackOverflow: x => x,
};

const SpeakerSocialLink = ({type, value}) => (
  <IconLink href={hrefs[type](value)} icon={icons[type]} className="social-icon-link" />
);

export default SpeakerSocialLink;

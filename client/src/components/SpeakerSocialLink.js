import React from 'react';
import cn from 'classnames';

const icons = {twitter: 'twitter', linkedin: 'linkedin', github: 'github', stackOverflow: 'stack-overflow'};
const hrefs = {
  twitter: x => `https://twitter.com/${x}`,
  linkedin: x => x,
  github: x => `https://github.com/${x}`,
  stackOverflow: x => x
};

const SpeakerSocialLink = ({ type, value }) => (
  <a
    key={type}
    target="_blank"
    className="flex-1 text-center"
    href={hrefs[type](value)}
    style={{ color: 'rgba(0,30,60,0.7)' }}
  ><i className={cn("fa", `fa-${icons[type]}`)}/></a>
);

export default SpeakerSocialLink;
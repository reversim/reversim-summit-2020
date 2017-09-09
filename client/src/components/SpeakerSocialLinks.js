import React from 'react';
import cn from 'classnames';


const social = ['twitter', 'linkedin', 'github', 'stackOverflow'];
const icons = {twitter: 'twitter', linkedin: 'linkedin', github: 'github', stackOverflow: 'stack-overflow'};
const hrefs = {
  twitter: x => `https://twitter.com/${x}`,
  linkedin: x => x,
  github: x => `https://github.com/${x}`,
  stackOverflow: x => x
};

const SpeakerSocialLinks = (props) => {
  const links = social
    .filter(type => !!props[type])
    .map(type => <a key={type}  target="_blank" className="flex-1 text-center" href={hrefs[type](props[type])}><i className={cn("fa", `fa-${icons[type]}`)}/></a>);

  return <div className={cn(props.className, "d-flex align-items-center")}>
    {links}
  </div>
};

export default SpeakerSocialLinks;
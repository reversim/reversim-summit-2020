import React from 'react';
import cn from 'classnames';
import SpeakerSocialLink from './SpeakerSocialLink';

const social = ['twitter', 'linkedin', 'github', 'stackOverflow'];

const SpeakerSocialLinks = (props) => {
  const links = social
    .filter(type => !!props[type])
    .map(type => (
      <SpeakerSocialLink type={type} value={props[type]} key={props[type]} />
    ));

  return <div className={cn(props.className, "d-flex align-items-center")}>
    {links}
  </div>
};

export default SpeakerSocialLinks;
import React from 'react';
import s from './Speaker.css';
import cn from 'classnames';

const social = ['twitter', 'linkedin', 'github', 'stackOverflow'];
const icons = { twitter: 'twitter', linkedin: 'linkedin', github: 'github', stackOverflow: 'stack-overflow' };
const hrefs = { twitter: x => `https://twitter.com/${x}`, linkedin: x => x, github: x => `https://github.com/${x}`, stackOverflow: x => x };


const Speaker = ({ name, bio, oneLiner, picture, color, ...props }) => {
  const links = social.filter(type => !!props[type]).map(type => <a target="_blank" className="flex-1 text-center" href={hrefs[type](props[type])}><i className={cn("fa", `fa-${icons[type]}`)}/></a>);
  return <div className={cn(s.speaker, s[color])}>
    <div className="d-flex">
      <div style={{backgroundImage: `url('${picture}')`}} className={s.speakerImg}/>
      <div className={cn(s.speakerLinks, 'flex-1 d-flex align-items-center')}>
        {links}
      </div>
    </div>
    <div className={cn(s.speakerInfo, "p-2", "line-height-12")}>
      <div className="font-weight-bold">{name}</div>
      <small className="">{oneLiner}</small>
    </div>
  </div>
};

export default Speaker;
import React from 'react';
import s from './Speaker.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import SpeakerSocialLinks from "./SpeakerSocialLinks";




const Speaker = ({_id, name, bio, oneLiner, picture, color, ...props}) => {


  return <Link to={`/speaker/${_id}`} className={s.speakerLinkWrap}>
    <div className={cn(s.speaker, s[color])}>
      <div className="d-flex">
        <div style={{backgroundImage: `url('${picture}')`}} className={s.speakerImg}/>
        <div className={cn(s.speakerLinks, 'flex-1')}>
          <SpeakerSocialLinks {...props} className="h-100"/>
        </div>
      </div>
      <div className={cn(s.speakerInfo, "p-2", "line-height-12")}>
        <div className="font-weight-bold">{name}</div>
        <small className="">{oneLiner}</small>
      </div>
    </div>
  </Link>
};

export default Speaker;
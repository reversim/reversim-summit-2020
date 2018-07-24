import React from 'react';
import s from './Speaker.css';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import {getHref} from '../utils';

const Speaker = ({speaker, color, isFull, ...props}) => {
  const {name, bio, oneLiner, picture} = speaker;
  return (
    <Link to={`/speaker/${getHref(speaker)}`} className={s.speakerLinkWrap}>
      <div className={cn(s.speaker, s[color], {[s.isFull]: isFull})}>
        <div className={cn({'d-flex': !isFull})}>
          <div style={{backgroundImage: `url('${picture}')`}} className={s.speakerImg} />
          <div className={cn(s.speakerLinks, 'flex-1')}>
            {isFull ? (
              <p className="p-3 mb-0">{bio}</p>
            ) : (
              <SpeakerSocialLinks {...props} className="h-100" />
            )}
          </div>
        </div>
        <div className={cn(s.speakerInfo, {'p-2': !isFull}, {'p-3': isFull}, 'line-height-12')}>
          <div className="font-weight-bold mb-1">{name}</div>
          <small className="">{oneLiner}</small>
          {isFull && (
            <div className={cn(s.speakerLinksFull, 'pt-3')}>
              <SpeakerSocialLinks {...props} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Speaker;

import React from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import {getHref} from '../utils';
import {img} from './Speaker2.css';

const Speaker = ({speaker, keynote}) => {
  const {name, oneLiner, picture, twitter, github, linkedin, stackOverflow} = speaker;
  return (
    <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
      <div className="d-flex align-items-start">
        <div style={{backgroundImage: `url('${picture}')`}} alt={name} className={img} />
        <div
          className={cn('pt-8 pb-4 pl-8 pr-4 mt-4 bg-emph p-relative')}
          style={{marginLeft: -20}}>
          {keynote && (
            <div
              style={{letterSpacing: 0.8, top: -10, left: 0, zIndex: 1}}
              className="d-inline-block px-2 text-uppercase bg-cyan text-darkblue font-weight-bold line-height-12 p-absolute">
              Keynote speaker
            </div>
          )}
          <div className="font-size-md font-weight-bold mb-4">{name}</div>
          <div className="font-size-sm mb-7">{oneLiner}</div>
          <SpeakerSocialLinks {...{twitter, github, linkedin, stackOverflow}} />
        </div>
      </div>
    </Link>
  );
};

export default Speaker;

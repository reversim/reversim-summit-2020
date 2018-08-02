import React from 'react';
import {Container, Button, Row} from 'reactstrap';
import {img, body, homepageImg, homepageBody} from './Speaker2.css';
import cn from 'classnames';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import sampleSize from 'lodash/sampleSize';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';

const Speaker = ({speaker}) => {
  const {name, oneLiner, picture, twitter, github, linkedin, stackOverflow} = speaker;
  return (
    <span>
      <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
        <div
          style={{backgroundImage: `url('${picture}')`}}
          alt={name}
          className={cn(img, homepageImg)}
        />
      </Link>
      <div className={cn(body, homepageBody, 'ml-4 pt-8 pb-4 px-2 bg-emph')}>
        <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
          <div className="font-weight-heavy mb-3" style={{letterSpacing: 0.5}}>
            {name}
          </div>
          <div className="font-size-sm mb-6">{oneLiner}</div>
        </Link>
        <SpeakerSocialLinks {...{twitter, github, linkedin, stackOverflow}} />
      </div>
    </span>
  );
};

const SpeakersSection = props => {
  const speakers = sampleSize(props.speakers, 6).map(s => props.users[s]);
  const perRow = props.isSmallScreen ? 2 : 3;
  return (
    <section className="mb-20">
      <Container>
        <h1 className="mb-14">Speakers</h1>
        <Row className="justify-content-center">
          {speakers.map((speaker, i) => (
            <div className={cn('mb-18', {'mr-14': (i + 1) % perRow})} key={i}>
              <Speaker speaker={speaker} />
            </div>
          ))}
        </Row>
        <div className="d-flex align-items-center mt-2">
          <div className="border border-cyan mr-4 flex-1" />
          <a href="/speakers">
            <Button>View all speakers</Button>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default SpeakersSection;

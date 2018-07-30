import React from 'react';
import Page from './Page';
import {Container, Row} from 'reactstrap';
import cn from 'classnames';
import {img} from './Speaker2.css';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import shuffle from 'lodash/shuffle';

const Speaker = ({speaker}) => {
  const {name, oneLiner, picture} = speaker;
  return (
    <Link to={`/speaker/${getHref(speaker)}`} className="text-white">
      <div className="bg-emph d-inline-block py-4 px-3 font-weight-heavy">{name}</div>
      <div
        style={{
          backgroundImage: `url('${picture}')`,
          width: 180,
          height: 180,
          marginTop: -10,
          marginLeft: 10,
        }}
        className={cn(img, 'p-relative')}>
        <div className="pt-5 px-3 p-absolute d-none stretch bg-emph font-size-sm">{oneLiner}</div>
      </div>
    </Link>
  );
};

const isDownCalc = perRow => index => !((index + perRow - 1) % perRow);

const SpeakesPage = ({speakers, users, ...props}) => {
  const perRow = 2;
  const isDown = isDownCalc(perRow);
  const shuffledSpeakers = shuffle(speakers);
  return (
    <Page title="Speakers" {...props}>
      <Container>
        <h1 className="text-center my-5">Meet the speakers</h1>
        <Row>
          {shuffledSpeakers.map((speaker, i) => (
            <div
              className={cn('mb-18', {'mt-16': isDown(i), 'mr-8 mr-md-15': (i + 1) % 4})}
              key={i}>
              <Speaker speaker={users[speaker]} />
            </div>
          ))}
        </Row>
      </Container>
    </Page>
  );
};

export default SpeakesPage;

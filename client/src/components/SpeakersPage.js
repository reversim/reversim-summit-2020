import React from 'react';
import Page from './Page';
import {Container, Row} from 'reactstrap';
import cn from 'classnames';
import {img} from './Speaker2.css';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import shuffle from 'lodash/shuffle';
import without from 'lodash/without';
import Speaker2 from './Speaker2';

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

const SpeakersPage = ({speakers, users, ...props}) => {
  const perRow = 2;
  const isDown = isDownCalc(perRow);
  const shuffledSpeakers = shuffle(
    without(speakers, '5b60af7eb5c7a00014aaff91', '5b45baa6990eba0014f62e39'),
  );
  const benji = users['5b60af7eb5c7a00014aaff91'];
  const holden = users['5b45baa6990eba0014f62e39'];
  return (
    <Page title="Speakers" {...props}>
      <Container>
        <h1 className="my-10">Meet the speakers</h1>
        <Row noGutters>
          {benji && (
            <div className="mb-18 mr-8 mr-md-15">
              <Speaker2 speaker={benji} keynote />
            </div>
          )}
          {holden && (
            <div className="mb-18 mr-8 mr-md-15">
              <Speaker2 speaker={holden} keynote />
            </div>
          )}
        </Row>
        <Row noGutters>
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

export default SpeakersPage;

import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';
import cn from 'classnames';
import {img} from './Speaker2.css';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import Speaker2 from './Speaker2';

const Speaker = ({speaker, imgSize}) => {
  const {name, oneLiner, picture} = speaker;
  return (
    <Link to={`/speaker/${getHref(speaker)}`} className="text-white">
      <div className="bg-emph d-inline-block py-4 px-3 font-weight-heavy text-nowrap">{name}</div>
      <div
        style={{
          backgroundImage: `url('${picture}')`,
          width: imgSize,
          height: imgSize,
          marginTop: -10,
          marginLeft: 10,
        }}
        className={cn(img, 'p-relative')}>
        <div className="pt-5 px-3 p-absolute d-none stretch bg-emph font-size-sm">{oneLiner}</div>
      </div>
    </Link>
  );
};

const SpeakersPage = ({shuffledSpeakers, users, ...props}) => {
  const benji = users['5b60af7eb5c7a00014aaff91'];
  const holden = users['5b45baa6990eba0014f62e39'];
  const perRow = props.isSmallerScreen ? 2 : props.isSmallScreen ? 3 : 4;
  const maxWidth = props.isSmallerScreen ? 230 : 190;
  return (
    <Page title="Speakers" {...props}>
      <Container>
        <h1 className="my-10">Speakers</h1>
        <Row noGutters>
          <Col className="mr-8 mr-md-9" style={{marginLeft: props.isSmallerScreen ? 0 : -15}}>
            {benji && (
              <div className="mb-18">
                <Speaker2 speaker={benji} keynote />
              </div>
            )}
          </Col>
          <Col style={{marginRight: -15}}>
            {holden && (
              <div className="mb-18">
                <Speaker2 speaker={holden} keynote />
              </div>
            )}
          </Col>
        </Row>
        <Row className="speakers-section__speakers-wrapper">
          {shuffledSpeakers.map((speaker, i) => (
            <div
              className={cn('mb-18', {'mr-16 mr-md-15 mr-lg-13': (i + 1) % perRow})}
              key={i}
              style={{maxWidth}}>
              <Speaker speaker={users[speaker]} imgSize={180} />
            </div>
          ))}
        </Row>
      </Container>
    </Page>
  );
};

export default SpeakersPage;

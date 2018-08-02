import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';
import {img} from './Speaker2.css';

const TeamMember = ({picture, name, oneLiner, bio}) => (
  <div className="mr-8 mb-8">
    <div style={{backgroundImage: `url('${picture}')`}} alt={name} className={img} />
    <div className="bg-emph ml-4 pt-8 px-4 pb-4" style={{marginTop: -20}}>
      <h4>{name}</h4>
      <p>{oneLiner}</p>
      <p>{bio}</p>
    </div>
  </div>
);

const AboutPage = props => {
  return (
    <Page title="About" {...props}>
      <Container className="mt-4">
        <h1 className="p-relative z-1 text-uppercase mb-0">About</h1>
        <div className="d-flex align-items-start mb-24" style={{marginTop: -40}}>
          <div className="bg-emph pt-10 pl-4 pb-4 pr-8 flex-1">
            <h4 className="mb-3">Reversim Summit</h4>
            <div className="bg-cyan mb-3" style={{width: 70, height: 3}} />
            <p className="font-weight-light">
              Reversim summit is our intention to create a conference for developers by developers.
              Like in the podcast, we bring you the content we are interested in, and we hope you
              will be too.
            </p>
            <p>
              This is the 6th(!) Reversim Summit. The summits of 2013 and 2014 (TLV Campus), 2015
              (Technion), 2016 (Weizmann Institute of Science) and 2017 (College of Management) also
              featured community content. Watch previous years' sessions to get the general feel of
              the Revesim Summit spirit.
            </p>
          </div>
          <div className="bg-emph py-4 pl-8 pr-4 mt-5 flex-1" style={{marginLeft: -25}}>
            <h4 className="mb-3">Reversim podcast</h4>
            <div className="bg-cyan mb-3" style={{width: 70, height: 3}} />
            <p className="font-weight-light">
              Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which
              brings together software developers and product, with over 300 recorded episodes and a
              few thousands listeners.
            </p>
          </div>
        </div>
        <Row noGutters>
          {props.team.map(id => (
            <Col xs="12" md="6">
              {<TeamMember {...props.users[id]} />}
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  );
};

export default AboutPage;

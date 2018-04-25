import React from 'react';
import sponsorsData from '../data/sponsors';
import Section from "./Section";
import s from './Sponsors.css';
import { Row, Col, Container } from 'reactstrap';
import Page from "./Page";
import { REVERSIM_SUMMIT } from '../utils';

const Sponsor = ({ name, logo, url, description, featuredJobInfo, featuredJobLink, excludeWebsite}) => {
  return (
    <div key={name}>
      <div className="text-center mb-4">
        <a href={url} target="_blank"><img src={logo} className={s.sponsorImg} alt={name}/></a>
      </div>
      <Row noGutters={true}>
        <Col sm={{ size: 8, offset: 2}} className="separator pb-5 mb-5">
          <h4>{name}</h4>
          <p>{description} {!excludeWebsite && <span><a href={url}>{name}'s website</a>.</span>}</p>
          {featuredJobLink && <h5>Featured job</h5> }
          {featuredJobLink && <p>{featuredJobInfo} {!excludeWebsite && <span>Interested? More info <a href={featuredJobLink}>here</a>.</span>}</p> }
        </Col>
      </Row>
    </div>
  )
};

const SponsorMini = ({ name, logo, url }) => (
  <Col key={name} className="mr-sm-5 mb-5" xs="12" md="auto">
    <a href={url} target="_blank"><img src={logo} className={s.sponsorImg} alt={name}/></a>
  </Col>
);

export const SponsorsSection = () => (
  <Section title="Sponsors">
    <Row className="justify-content-center">
      {sponsorsData.map(SponsorMini)}
      <WantToBe/>
    </Row>
  </Section>
);

const WantToBe = () => (
  <div className="my-4 p-3 bg-gray-200 line-height-17 text-center"><h4>Want to be a sponsor?</h4> Contact our amazing Gilli at <a href="mailto:gilli@reversim.com">gilli@reversim.com</a> and let's have fun together!</div>
);

const Sponsors = (props) => (
  <Page title="Sponsors" {...props}>
    <h1 className="text-center mt-5">Our sponsors</h1>
    <WantToBe/>
    <Container>
      <p className="text-center mb-5">Here are the companies who made <b>{REVERSIM_SUMMIT}</b> possible:</p>
      {sponsorsData.map(Sponsor)}
      <WantToBe/>
    </Container>
  </Page>
);

export default Sponsors;
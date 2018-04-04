import React from 'react';
import sponsorsData from '../data/sponsors';
import Section from "./Section";
import s from './Sponsors.css';
import { Row, Col } from 'reactstrap';
import Page from "./Page";
import { REVERSIM_SUMMIT } from '../utils';

const Sponsor = ({ name, logo, url, description, featuredJobInfo, featuredJobLink, excludeWebsite}) => {
  return (
    <div key={name}>
      <div className="text-center">
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
    <Row>
      {sponsorsData.map(SponsorMini)}
    </Row>
  </Section>
);

const Sponsors = (props) => (
  <Page title="Sponsors" {...props}>
    <h1 className="text-center mt-5">Our sponsors</h1>
    <p className="text-center mb-5">Here are the companies who made <b>{REVERSIM_SUMMIT}</b> possible:</p>
    {sponsorsData.map(Sponsor)}
  </Page>
);

export default Sponsors;
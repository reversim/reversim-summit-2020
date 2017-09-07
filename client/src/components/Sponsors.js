import React from 'react';
import sponsorsData from '../data/sponsors';
import Section from "./Section";
import s from './Sponsors.css';
import { Row, Col } from 'reactstrap';

const Sponsor = ({ name, logo, url, description, featuredJobInfo, featuredJobLink, excludeWebsite}) => {
  return (
    <div key={name}>
      <div className="text-center">
        <a href={url} target="_blank"><img src={logo} className={s.sponsorImg}/></a>
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

const Sponsors = ({}) => {
  const sponsorsComponents = sponsorsData.map(Sponsor);

  return (
    <Section title="Sponsors">
      {sponsorsComponents}
    </Section>
  )
};

export default Sponsors;
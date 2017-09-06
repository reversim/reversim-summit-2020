import React, { Component } from 'react';
import sponsorsData from '../data/sponsors';
import Section from "./Section";

const Sponsor = ({ name, logo, url, description, featuredJobInfo, featuredJobLink, excludeWebsite}) => {
  return (
    <div>
      <div className="center-block">
        <img src={logo}/>
      </div>
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
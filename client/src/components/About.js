import React from 'react';
import Section from './Section';
import { Row, Col } from 'reactstrap';
import aboutImg from '../images/about.png';
import { REVERSIM_SUMMIT } from '../utils';

const About = () => (
  <Section title="About">
    <Row>
      <Col className="pr-5 mb-5 ml-lg-auto" xs="12" lg="6">
        <img className="d-block ml-auto img-fluid" src={aboutImg} alt={REVERSIM_SUMMIT} />
      </Col>
      <Col>
        <h4 className="mb-4">General Info</h4>
        <h5>About Reversim Summit</h5>
        <p>
          Reversim summit is our intention to create a conference for developers by developers. Like in the podcast, we
          bring you the content we are interested in, and we hope you will be too.
        </p>
        <p className="mb-4">
          This is the 6th(!) Reversim Summit. The summits of 2013 and 2014 (TLV Campus), 2015 (Technion), 2016
          (Weizmann Institute of Science) and 2017 (College of Management) also featured community content. Watch previous years' sessions to get the
          general feel of the Revesim Summit spirit.
        </p>

        <h5>About Reversim Podcast</h5>
        <p>
          Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which brings together software
          developers and product, with over 300 recorded episodes and a few thousands listeners.
        </p>
      </Col>
    </Row>
  </Section>
);

export default About;
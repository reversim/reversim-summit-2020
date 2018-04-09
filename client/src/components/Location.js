import React from 'react';
import Section from "./Section";
import Map from "./Map";
import s from './Location.css';
import cn from 'classnames';
import { Row } from 'reactstrap';

const Location = () => (
  <Section title="Location" isFullWidth={true}>
    <Map/>
    <div className={cn(s.info, "p-4 p-md-5 bg-white")}>
      <h3 className="pb-4">Location</h3>
      <Row className="pb-3">
        <i className="fa fa-map-marker text-primary mr-3"/><span>Tel Aviv University,<br /> Smolarz Auditorium</span>
      </Row>
      {/*<Row>*/}
        {/*<i className="fa fa-info text-primary mr-3"/><span>More info will be published soon</span>*/}
      {/*</Row>*/}
    </div>
  </Section>
);

export default Location;
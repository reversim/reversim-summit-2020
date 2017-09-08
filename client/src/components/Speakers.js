import React from 'react';
import Section from "./Section";

const Speakers = ({speakers}) => (
  <Section title="Speakers">
    {speakers.map(x => x.name)}
  </Section>
);

export default Speakers;
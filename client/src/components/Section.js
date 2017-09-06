import React from 'react';
import { Container } from 'reactstrap';
import Header from './Header';

const Section = ({title, isFullWidth, children}) => (
  <section>
    <Header title={title}/>
    <Container fluid={isFullWidth}>
      {children}
    </Container>
  </section>
);

export default Section;
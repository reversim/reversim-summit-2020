import React from 'react';
import cn from 'classnames';
import {Container} from 'reactstrap';
import Header from './Header';
import s from './Section.css';

const Section = ({title, isFullWidth, bg, children}) => (
  <section className="mt-5">
    <h1>{title}</h1>
    <Container
      fluid={isFullWidth}
      className={cn({[s.fixedBackground]: bg, 'text-white': bg})}
      style={bg && {backgroundImage: `url('${bg}')`}}>
      {children}
    </Container>
  </section>
);

export default Section;

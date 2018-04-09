import React, { createElement } from 'react';
import homeSections from '../data/home-sections';
import Page from './Page';

const Home = (props) => (
  <Page isHome={true} {...props}>
    {homeSections.map(({ el }, i) => createElement(el, { key: i, ...props }))}
  </Page>
);

export default Home;
import React, {Component} from 'react';
import {Element} from 'react-scroll';
import homeSections from '../data/home-sections';
import Page from './Page';
import store from '../store';

const renderSection = ({name, el}, i) => (
  <Element name={name} key={i}>
    {React.createElement(el, store)}
  </Element>
);

class Home extends Component {

  render() {
    const {} = this.props;
    return (
      <Page isHome={true}>
        {homeSections.map(renderSection)}
      </Page>
    );
  }

}

export default Home;
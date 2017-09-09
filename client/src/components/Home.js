import React, {Component} from 'react';
import {Element} from 'react-scroll';
import homeSections from '../data/home-sections';
import Page from './Page';

class Home extends Component {

  renderSection = ({name, el}, i) => (
    <Element name={name} key={i}>
      {React.createElement(el, this.props)}
    </Element>
  );

  render() {
    console.log(this.props);
    return (
      <Page isHome={true}>
        {homeSections.map(this.renderSection)}
      </Page>
    );
  }

}

export default Home;
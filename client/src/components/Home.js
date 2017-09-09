import React, {Component} from 'react';
import {Element, scroller} from 'react-scroll';
import homeSections from '../data/home-sections';
import Page from './Page';

class Home extends Component {

  componentDidMount() {
    let { pathname } = window.location;
    if (pathname) pathname = pathname.slice(1);
    scroller.scrollTo(pathname, {
      offset: -80
    });
  }

  renderSection = ({name, el}, i) => (
    <Element name={name} key={i}>
      {React.createElement(el, this.props)}
    </Element>
  );

  render() {
    return (
      <Page isHome={true}>
        {homeSections.map(this.renderSection)}
      </Page>
    );
  }

}

export default Home;
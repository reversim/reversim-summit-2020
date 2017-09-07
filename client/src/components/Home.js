import React, {Component} from 'react';
import {Element} from 'react-scroll';
import homeSections from '../data/home-sections';
import Navbar from './Navbar';

const renderSection = ({name, el}, i) => (
  <Element name={name} key={i}>
    {React.createElement(el)}
  </Element>
);

class Home extends Component {

  render() {
    const {} = this.props;
    return (
      <div>
        <Navbar isHome={true}/>
        {homeSections.map(renderSection)}
      </div>
    );
  }

}

export default Home;
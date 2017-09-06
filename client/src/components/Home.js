import React, { Component } from 'react';
import Hero from './Hero';
import Team from './Team';
import About from './About';

class Home extends Component {

    render() {
        const {  } = this.props;
        return (
          <div>
            <Hero />
            <About title="About" />
            <Team/>
          </div>
        );
    }

}

export default Home;
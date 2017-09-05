import React, { Component } from 'react';
import Hero from './Hero';
import Team from './Team';

class Home extends Component {

    render() {
        const {  } = this.props;
        return (
          <div>
            <Hero />
            <Team/>
          </div>
        );
    }

}

export default Home;
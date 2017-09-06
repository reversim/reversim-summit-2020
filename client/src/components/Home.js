import React, { Component } from 'react';
import homeSections from '../data/home-sections';

const renderSection = ({ el }, i) => (
    React.createElement(el, { key: i})
);

class Home extends Component {

    render() {
        const {  } = this.props;
        return (
          <div>
            { homeSections.map(renderSection) }
          </div>
        );
    }

}

export default Home;
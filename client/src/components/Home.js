import React, { Component } from 'react';
import homeSections from '../data/home-sections';

const renderSection = ({ el }) => (
    React.createElement(el)
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
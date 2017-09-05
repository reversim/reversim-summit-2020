import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Agenda from './components/Agenda';
import Team from './components/Team';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/agenda" component={Agenda}/>
          <Route exact path="/team" component={Team}/>
        </div>
      </Router>
    );
  }
}

export default App;

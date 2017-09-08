import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Agenda from './components/Agenda';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/schedule" component={Agenda}/>
          <Route exact path="/about" component={Home}/>
          <Route exact path="/register" component={Home}/>
          <Route exact path="/team" component={Home}/>
          <Route exact path="/speakers" component={Home}/>
          <Route exact path="/location" component={Home}/>
          <Route exact path="/sponsors" component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;

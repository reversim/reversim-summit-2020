import React from 'react';
import { render } from 'react-dom';
import Navbar from './Navbar';
import logoImg2x from 'images/reversim_logo@2x.png';

import http from 'axios';

const get = (
  url,
  params = {},
  headers = {}
) => http.get(`${url}`, {
  params,
  headers
}).then(resp => resp.data);

class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {title, speaker, attendeeCount, attendees} = this.props;
    const { isOpen } = this.state;

    return (
      <div className="proposal separator pb-4 mb-4">
      <div className="row align-items-center">
        <div className="col">
          <h6>{title}</h6>
          <div>{speaker}</div>
        </div>
        <div className="col-auto mr-3">
          <h3>{attendeeCount}</h3>
        </div>
        {attendees && <button className="btn btn-link" onClick={this.toggle}>+</button>}
      </div>
        {isOpen && <div className="row no-gutters">
          <div className="col-10 offset-1">
            {attendees.map((a, i) => <div key={i}>{a}</div>)}
          </div>
        </div>}
      </div>
    );

  }
}

const items = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Timeline", href: "/timeline" },
  { name: "Proposals", href: "/proposals" },
  { name: "Sponsors", href: "/sponsors" },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: []
    };
  }

  componentWillMount() {
    get("/api/proposal/attendees")
      .then(proposals => {
        this.setState({
          proposals
        });
      })
      .catch(err => {
        console.log("error when fetching data", err);
      })
  }

  renderProposals() {
    return (
      <div className="container">
        {this.state.proposals.map((p, i) => <Proposal {...p} key={i}/>)}
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <Navbar location={window.location} logo={logoImg2x} items={items} />
        {this.renderProposals()}
      </div>
    );
  }
}

render(<App/>, document.getElementById("app"));
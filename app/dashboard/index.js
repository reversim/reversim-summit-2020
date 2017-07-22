import React from 'react';
import { render } from 'react-dom';
import pluralize from 'pluralize';
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
    const {title, speaker, attendeeCount, link, attendees, index} = this.props;
    const { isOpen } = this.state;

    return (
      <div className="proposal separator pb-4 mb-4">
      <div className="row align-items-center">
        <div className="col-auto ml-3" style={{fontSize:40, fontWeight:100, lineHeight:1}}>{index}.</div>
        <div className="col">
          <h6 className="m-0"><a href={link} target="_blank" className="unstyled-link">{title}</a></h6>
          <div style={{fontWeight:300}}>{speaker}</div>
        </div>
        <div className="col-auto mr-3">
          <h3>{attendeeCount}</h3>
        </div>
        {attendees && <button className="btn btn-link" onClick={this.toggle}>{isOpen ? '\u2796' : '\u2795'}</button>}
      </div>
        {isOpen && <div className="row no-gutters mt-3">
          <div className="col-10 offset-1 text-muted">
            {attendees.map((a, i) => <div key={i}>{i+1}. {a}</div>)}
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
      proposals: [],
      data: {}
    };
  }

  componentWillMount() {
    get("/api/proposal/attendees")
      .then(({ proposals, data }) => {
        this.setState({
          proposals,
          data
        });
      })
      .catch(err => {
        console.log("error when fetching data", err);
        let str;
        if (err.status === 401) {
          str = "You do not have permission to access this data";
        } else {
          str = "Something went very very wrong...";
        }

        this.setState({
          error: str
        })
      })
  }

  renderProposals() {
    return (
      <div className="container">
        {this.state.proposals.map((p, i) => <Proposal {...p} index={i+1} key={i}/>)}
      </div>
    );
  }

  renderData() {
    const { data: { totalVotes, uniqueVoters, averagePerVoter } } = this.state;
    const startTime = new Date(2017,6,21,7), endTime = new Date();
    const elapsedHours = (endTime - startTime) / 1000 / 60 / 60;
    const elapsedDays = elapsedHours / 24;
    const remainderHours = (elapsedDays % 1) * 24;
    const remainderMinutes = (remainderHours % 1) * 60;
    const days = Math.floor(elapsedDays);
    const hours = Math.floor(remainderHours);
    const minutes = Math.floor(remainderMinutes);

    const votesPerHour = totalVotes / elapsedHours;
    return (
      <div className="bg-info text-white text-center p-4 mb-4">
        <div className="container">
          <div className="row justify-content-center mb-4">
            Voting started {days}&nbsp;{pluralize('day', days)}, {hours}&nbsp;{pluralize('hour', hours)} and {minutes}&nbsp;{pluralize('minute', minutes)} ago
          </div>
          <div className="row">
            <div className="col">
              <h4>{ totalVotes }</h4>
              <small>Total Votes</small>
            </div>
            <div className="col">
              <h4>{ uniqueVoters }</h4>
              <small>Unique voters</small>
            </div>
            <div className="col">
              <h4>{ averagePerVoter.toFixed(2) }</h4>
              <small>Average per voter</small>
            </div>
            <div className="col">
              <h4>{ votesPerHour.toFixed(2) }</h4>
              <small>Votes per hour</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <Navbar location={window.location} logo={logoImg2x} items={items} />
        { this.renderData() }
        { this.renderProposals() }
        { this.state.error && <div className="mt-5 text-center">
          <h2 className="text-muted">{this.state.error}</h2>
        </div>}
      </div>
    );
  }
}

render(<App/>, document.getElementById("app"));
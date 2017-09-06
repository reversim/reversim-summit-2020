import React, {Component} from 'react';
import Section from "./Section";

class Team extends Component {

  state = {
    team: []
  };

  componentWillMount() {
    fetch('/api/team').then(resp => resp.json()).then(team => {
      this.setState({team});
    });
  }

  render() {
    const {team} = this.state;
    return (
      <Section title="Team">
        {team.map((x, i) => <div key={i}>{x.name}</div>)}
      </Section>
    );
  }

}

export default Team;
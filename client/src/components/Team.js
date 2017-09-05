import React, {Component} from 'react';

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
      <div>
        {team.map((x, i) => <div key={i}>{x.name}</div>)}
      </div>
    );
  }

}

export default Team;
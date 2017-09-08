import React, {Component} from 'react';
import Section from "./Section";
import { observer } from 'mobx-react';

class Team extends Component {

  render() {
    const {team} = this.props;
    return (
      <Section title="Team">
        {team.map((x, i) => <div key={i}>{x.name}</div>)}
      </Section>
    );
  }

}

export default observer(Team);
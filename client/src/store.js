import { observable } from 'mobx';
import { getSpeakers, getTeam } from './data-service';

const store = observable({
  speakers: [],
  team: []
});

export default store;

getTeam().then(team => {
  store.team = team;
});

getSpeakers().then(speakers => {
  console.log(speakers);
  store.speakers = speakers;
});
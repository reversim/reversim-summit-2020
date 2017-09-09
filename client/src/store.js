import { observable } from 'mobx';
import { getSessions, getTeam } from './data-service';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';

const store = observable({
  speakers: [],
  sessions: [],
  team: [],
  showTeamMember: null,
  onTeamMemberClick: id => {
    store.showTeamMember = store.showTeamMember === id ? null : id;
  },
  selectedDate: 0,
  setSelectedDate: i => store.selectedDate = i
});

export default store;

getTeam().then(team => {
  store.team = team;
});

getSessions().then(sessions => {
  store.sessions = sessions;
  store.speakers = uniq(flatMap(sessions, session => session.speaker_ids), '_id')
    .map(x => ({
      ...x,
      session: x.proposals.map(p => sessions.find(session => session._id === p)).filter(x => !!x)[0]
    }));
});

window.__store = store;
import { observable } from 'mobx';
import { getSessions, getTeam, getMe } from './data-service';
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
  setSelectedDate: i => store.selectedDate = i,
  isSmallScreen: window.innerWidth < 576,
  user: { isFetching: true },
  onLogout: () => store.user = { authenticated: false }
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
      sessions: filterSessions(x.proposals)
    }));
});

getMe().then(user => {
  user.sessions = filterSessions(user.proposals)
  store.user = user;
});

const filterSessions = sessionIds => sessionIds.map(p => store.sessions.find(session => session._id === p)).filter(x => !!x)

window.__store = store;
import { observable } from 'mobx';
import { getSessions, getTeam, getMe } from './data-service';
import uniqBy from 'lodash/uniqBy';
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
  store.sessions = sessions.map(session => ({
    ...session,
    speaker_ids: session.speaker_ids.map(speaker => ({
      ...speaker,
      picture: speaker.picture.replace("/dtltonc5g/image/upload/", "/dtltonc5g/image/upload/w_300/")
    }))
  }));

  store.speakers = uniqBy(flatMap(sessions, session => session.speaker_ids), x => x._id)
    .map(x => ({
      ...x,
      sessions: filterSessions(x.proposals)
    }))
    .sort((a, b) => {
      if (a.name === "Sheizaf Rafaeli") return -1;
      if (b.name === "Sheizaf Rafaeli") return 1;
      if (a.name === "Randy Shoup") return -1;
      if (b.name === "Randy Shoup") return 1;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    });
});

getMe().then(user => {
  user.sessions = filterSessions(user.proposals);
  store.user = user;
});

const filterSessions = sessionIds => sessionIds.map(p => store.sessions.find(session => session._id === p)).filter(x => !!x)

window.__store = store;
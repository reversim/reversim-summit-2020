import { addMessage, removeMessage } from './data-service';
// import uniq from 'lodash/uniq';
// import flatMap from 'lodash/flatMap';
import { isServer } from './utils';

const store = {
  proposals: {},
  users: {},
  user: null,
  team: [],
  messages: [],
  allTags: [],
  features: {
    submission: true
  },
  sponsors: [],

  isSmallScreen: window.innerWidth < 576,

  onAddMessage: (text) => {
    addMessage(text).then(msg => store.messages.push(msg));
  },
  onRemoveMessage: (id) => {
    const index = store.messages.findIndex(x => x._id === id);
    removeMessage(id).then(() => store.messages.splice(index, 1));
  },
};


// TODO put this in initStore and enable when agenda is finalized
// const filterSessions = sessionIds => sessionIds.map(p => store.sessions.find(session => session._id === p)).filter(x => !!x);
// store.sessions = store.proposals.filter(p => p.status === 'accepted');
// store.speakers = uniq(flatMap(store.sessions, session => session.speaker_ids))
// 	.map(speakerId => {
// 		const speaker = store.users[speakerId];
// 		return {
// 			...speaker,
//      sessions: filterSessions(speaker.proposals),
// 		};
// 	})
// 	.sort((a, b) => {
// 		if (a.name === "Sheizaf Rafaeli") return -1; // TODO keynote 1
// 		if (b.name === "Sheizaf Rafaeli") return 1;  // TODO keynote 1
// 		if (a.name === "Randy Shoup") return -1;		 // TODO keynote 2
// 		if (b.name === "Randy Shoup") return 1;			 // TODO keynote 2
// 		return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
// 	});


export default store;

if (!isServer) {
	window.__store = store;
}
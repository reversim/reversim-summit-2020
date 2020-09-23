import {isServer} from '../utils';
// import eventConfig from '../init/eventConfig';
const speakers = {to: 'speakers', text: 'Speakers'};
const sponsors = {to: 'sponsors', text: 'Sponsors'};
const agenda = {to: 'agenda', text: 'Agenda'};
const sessions = {to: 'sessions', text: 'Sessions'};
const about = {to: 'about', text: 'About'};

export default (eventConfig) => {
  let items;

  if (isServer) {
    items = [about, sponsors].map(item => ({
      ...item,
      external: true,
      to: `/${item.to}.html`,
    }));
  } else {
    items = [about];
    if (eventConfig.agendaPublished) {
      items.push(agenda);
    }
    items.push(sponsors);
    eventConfig.agendaPublished && items.push(speakers);
    // items.push(sessions);
  }

  return items;
};

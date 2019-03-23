import {isServer} from '../utils';

const _register = {to: 'register', text: 'Register'};
const _team = {to: 'team', text: 'Team'};
const location = {to: 'location', text: 'Venue'};
const speakers = {to: 'speakers', text: 'Speakers'};
const sponsors = {to: 'sponsors', text: 'Sponsors'};
const schedule = {to: 'schedule', text: 'Schedule'};
const _proposals = {to: 'proposals', text: 'Proposals'};
const sessions = {to: 'sessions', text: 'Sessions'};
const _timeline = {to: 'timeline', text: 'Timeline'};
const about = {to: 'about', text: 'About'};

export default () => {
  let items;

  if (isServer) {
    items = [about, sponsors].map(item => ({
      ...item,
      external: true,
      to: `/${item.to}.html`,
    }));
  } else {
    items = [about, sponsors];
  }

  return items;
};

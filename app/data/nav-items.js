import features from 'features';

let items;

const about = { to: "about", text: "About" };
const team = { to: "team", text: "Team" };
const location = { to: "location", text: "Location" };
const schedule = { to: "schedule", text: "Schedule", feature: 'publishAgenda', noScroll: true };
const timeline = { to: "timeline", text: "Timeline", feature: 'timeline', isNot: true };
const speakers = { to: "speakers", text: "Speakers", feature: 'publishAgenda' };
const proposals = { to: "proposals", text: "Proposals", feature: 'publishAgenda', isNot: true, noScroll: true };
const sponsors = { to: "sponsors", text: "Sponsors" };
const networking = { to: "networking", text: "Networking", feature: "networking" };

export default (currentPath) => {
  if (!features('startRegistration')) return [about, team, location];


  items = [
    about, schedule, timeline, speakers, proposals, team, sponsors, location, networking
  ];

  if (currentPath !== '/') {
    items = items.map(item => ({ noScroll: true, ...item }));
  }

  items = items.filter(item => {
    if (!item.feature) return true;
    const passFeature = features(item.feature, false);
    return item.isNot ? !passFeature : passFeature;
  });

  return items;
};
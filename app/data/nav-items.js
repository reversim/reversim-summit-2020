import features from 'features';

const about = { to: "about", text: "About" };
const team = { to: "team", text: "Team", feature: "team" };
const location = { to: "location", text: "Location" };
const schedule = { to: "schedule", text: "Schedule", feature: 'publishAgenda', noScroll: true };
const timeline = { to: "timeline", text: "Timeline", feature: 'timelineFinalized' };
const speakers = { to: "speakers", text: "Speakers", feature: 'publishAgenda' };
const proposals = { to: "proposals", text: "Proposals", feature: 'preCFP', isNot: true, noScroll: true };
const sponsors = { to: "sponsors", text: "Sponsors", feature: "sponsored" };
const networking = { to: "networking", text: "Networking", feature: "networking" };

export default (isHome) => {
  let items = [
    about, schedule, timeline, speakers, /*proposals,*/ team, sponsors, location, networking
  ];

  if (!isHome) {
    items = items.map(item => ({ noScroll: true, ...item }));
  }

  items = items.filter(item => {
    if (!item.feature) return true;
    const passFeature = features(item.feature, false);
    return item.isNot ? !passFeature : passFeature;
  });

  return items;
};
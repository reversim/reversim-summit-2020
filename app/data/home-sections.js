import _ from 'lodash';
import features from 'features';

import About from 'components/About';
import Messages from 'components/Messages';
import Speakers from 'components/Speakers';
import Networking from 'components/Networking';
import Timeline from 'components/Timeline';
import Proposals from 'components/Proposals';
import CFP from 'components/CFP';
import Register from 'components/Register';
import Sponsors from 'components/Sponsors';
import Team from 'components/Team';
import Location from 'components/Location';
import ScheduleSection from 'components/ScheduleSection';

export default (allProps) => {

  const sections = [
    { name: "messages", el: Messages },
    { name: "about", el: About },
    { name: "schedule", el: ScheduleSection, feature: 'publishAgenda', props: ['acceptedProposals'] },
    { name: "speakers", el: Speakers, props: ['speakers'], feature: 'publishAgenda' },
    { name: "cfp", el: CFP, feature: "submission" },
    { name: "timeline", el: Timeline, feature: 'timelineFinalized' },
    { name: "register", el: Register },
    { name: "proposals", el: Proposals, props: ['proposals', 'isReversimTeamMember'], feature: 'timelineFinalized' },
    { name: "team", el: Team, props: ['user.team'], feature: "team" },
    { name: "sponsors", el: Sponsors, feature: 'sponsored' },
    { name: "location", el: Location, props: ['location'] },
    { name: "networking", el: Networking, feature: "networking" }
  ];

  return sections.filter(item => {
    if (!item.feature) return true;
    const passFeature = features(item.feature, false);
    return item.isNot ? !passFeature : passFeature;
  }).map(item => {
    const props = {};
    if (item.props) {
      item.props.forEach(prop => {
        let propName = prop.includes(".") ? prop.split(".").slice(-1)[0] : prop;
        props[propName] = _.get(allProps, prop);
      });

      item.props = props;
    }
    return item;
  });
};
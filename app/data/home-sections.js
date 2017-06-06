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


const sections = [
  { name: "messages", el: Messages },
  { name: "about", el: About },
  { name: "schedule", el: ScheduleSection, feature: 'publishAgenda', props: ['acceptedProposals'] },
  { name: "speakers", el: Speakers, props: ['speakers'], feature: 'publishAgenda' },
  { name: "timeline", el: Timeline, feature: 'timelineFinalized' },
  { name: "register", el: Register },
  { name: "proposals", el: Proposals, props: ['proposals', 'isReversimTeamMember'], feature: 'timelineFinalized' },
  { name: "cfp", el: CFP, feature: "submission" },
  { name: "team", el: Team, props: ['user.team'] },
  { name: "sponsors", el: Sponsors, feature: 'sponsored' },
  { name: "location", el: Location, props: ['location'] },
  { name: "networking", el: Networking, feature: "networking" }
];

export default (allProps) => {
  return sections.filter(item => {
    if (!item.feature) return true;
    const passFeature = features(item.feature, false);
    return item.isNot ? !passFeature : passFeature;
  }).map(item => {
    if (item.props) {
      item.props = item.props.map(prop => _.get(allProps, prop));
    }
    return item;
  });
};
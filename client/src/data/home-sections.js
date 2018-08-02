import Hero from '../components/Hero';
// import About from '../components/About';
// import Team from '../components/Team';
// import Register from '../components/Register';
import SpeakersSection from '../components/SpeakersSection';
import Location from '../components/Location';
import {SponsorsSection} from '../components/Sponsors';
// import TimelineSection from '../components/TimelineSection';

const homeSections = [
  {name: 'hero', el: Hero},
  // {name: 'about', el: About},
  // { name: "register", el: Register },
  {name: 'speakers', el: SpeakersSection},
  // {name: 'timeline', el: TimelineSection},
  {name: 'location', el: Location},
  // {name: 'team', el: Team},
  {name: 'sponsors', el: SponsorsSection},
];

export default homeSections;

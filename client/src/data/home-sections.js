import Hero from '../components/Hero';
// import About from '../components/HomePageAboutSection';
// import Team from '../components/Team';
// import Register from '../components/Register';
// import SpeakersSection from '../components/SpeakersSection';
import Location from '../components/Location';
import HomePageSponsorsSection from '../components/SponsorsComps/HomePageSponsorsSection';
// import TimelineSection from '../components/TimelineSection';

const homeSections = [
  {name: 'hero', el: Hero},
  // {name: 'about', el: About},
  // { name: "register", el: Register },
  // {name: 'speakers', el: SpeakersSection},
  // {name: 'timeline', el: TimelineSection},
  {name: 'sponsors', el: HomePageSponsorsSection},
  // {name: 'team', el: Team},
  // {name: 'location', el: Location},
];

export default homeSections;

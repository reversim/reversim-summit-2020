import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Register from '../components/Register';
import SpeakersSection from '../components/SpeakersSection';
import Messages from '../components/Messages';
import Location from '../components/Location';
import { SponsorsSection } from '../components/Sponsors';

const homeSections = [
  { name: "hero",     el: Hero },
  { name: "messages", el: Messages },
  { name: "about",    el: About },
  { name: "register", el: Register },
  { name: "speakers", el: SpeakersSection },
  { name: "location", el: Location },
  { name: "team",     el: Team },
  { name: "sponsors", el: SponsorsSection }
];

export default homeSections;
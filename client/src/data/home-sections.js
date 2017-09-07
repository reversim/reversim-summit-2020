import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Register from '../components/Register';
import Speakers from '../components/Speakers';
import Location from '../components/Location';
import Sponsors from '../components/Sponsors';

const homeSections = [
  { name: "hero",     el: Hero },
  { name: "about",    el: About },
  { name: "register", el: Register },
  { name: "speakers", el: Speakers },
  { name: "location", el: Location },
  { name: "team",     el: Team },
  { name: "sponsors", el: Sponsors }
];

export default homeSections;
import Home from '../components/Home';
import Agenda from '../components/Agenda';
import SpeakerPage from '../components/SpeakerPage';
import SessionPage from '../components/SessionPage';
import SpeakersPage from "../components/SpeakersPage";
import Sponsors from "../components/Sponsors";
import RegisterPage from "../components/RegisterPage";
import LocationPage from "../components/LocationPage";
import AdminPage from '../components/AdminPage';
import WomenGathering from '../components/WomenGathering';
import CFPPage from '../components/CFPPage';

export default [
  { path: "/", comp: Home },
  { path: "/about", comp: Home },
  { path: "/register", comp: RegisterPage },
  { path: "/schedule", comp: Agenda },
  { path: "/speakers", comp: SpeakersPage },
  { path: "/location", comp: LocationPage },
  { path: "/sponsors", comp: Sponsors },
  { path: "/team", comp: Home },
  { path: "/speaker/:id", comp: SpeakerPage },
  { path: "/session/:id", comp: SessionPage },
  { path: "/admin", comp: AdminPage },
  { path: "/women-gathering", comp: WomenGathering },
  { path: "/cfp", comp: CFPPage },
]
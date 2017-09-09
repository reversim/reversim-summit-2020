import Home from '../components/Home';
import Agenda from '../components/Agenda';
import SpeakerPage from '../components/SpeakerPage';
import SessionPage from '../components/SessionPage';

export default [
  { path: "/", comp: Home },
  { path: "/schedule", comp: Agenda },
  { path: "/speakers", comp: Home },
  { path: "/location", comp: Home },
  { path: "/register", comp: Home },
  { path: "/sponsors", comp: Home },
  { path: "/team", comp: Home },
  { path: "/speaker/:id", comp: SpeakerPage },
  { path: "/session/:id", comp: SessionPage },
]
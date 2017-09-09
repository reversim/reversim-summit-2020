import Home from '../components/Home';
import Agenda from '../components/Agenda';
import SpeakerPage from '../components/SpeakerPage';
import SessionPage from '../components/SessionPage';

export default [
  { path: "/", comp: Home },
  { path: "/schedule", comp: Agenda },
  { path: "/speaker/:id", comp: SpeakerPage },
  { path: "/session/:id", comp: SessionPage },
]
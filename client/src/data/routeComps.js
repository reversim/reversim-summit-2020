import Home from '../components/Home';
import Agenda from '../components/Agenda';
import MyProfile from '../components/MyProfile';
import AboutPage from '../components/AboutPage';
import SpeakerPage from '../components/SpeakerPage';
import SpeakerEditPage from '../components/SpeakerEditPage';
import SessionPage from '../components/SessionPage';
import SessionEditPage from '../components/SessionEditPage';
import SpeakersPage from '../components/SpeakersPage';
import SponsorsPage from '../components/Sponsors';
import SponsorPage from "../components/SponsorPage";
// import RegisterPage from "../components/RegisterPage";
import LocationPage from '../components/LocationPage';
import TeamPage from '../components/TeamPage';
import AdminPage from '../components/AdminPage';
// import WomenGathering from '../components/WomenGathering';
import CFPPage from '../components/CFPPage';
import ProposalsPage from '../components/ProposalsPage';
import SessionsPage from '../components/SessionsPage';
import TimelinePage from '../components/TimelinePage';

import ScrollToTop from '../components/ScrollToTop';

export default [
  {path: '/', comp: Home},
  {path: '/about', comp: AboutPage},
  {path: '/profile', comp: MyProfile},
  // { path: "/register", comp: RegisterPage },
  {path: '/schedule', comp: Agenda},
  {path: '/speakers', comp: SpeakersPage},
  {path: '/location', comp: LocationPage},
  {path: '/sponsors', comp: SponsorsPage},
  {path: '/sponsor/:name', comp: SponsorPage},
  {path: '/team', comp: TeamPage},
  {path: '/speaker/:id', comp: SpeakerPage},
  {path: '/speaker/:id/edit', comp: SpeakerEditPage},
  {path: '/session/:id', comp: SessionPage},
  {path: '/session/:id/edit', comp: SessionEditPage},
  {path: '/admin', comp: AdminPage},
  // { path: "/women-gathering", comp: WomenGathering },
  {path: '/my-votes', comp: ProposalsPage, props: {myVotes: true}},
  {path: '/cfp', comp: CFPPage},
  {path: '/sessions', comp: SessionsPage},
  {path: '/proposals', comp: ProposalsPage},
  {path: '/timeline', comp: TimelinePage},
].map(({path, comp}) => ({path, comp: ScrollToTop(comp)}));

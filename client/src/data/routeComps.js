import Home from '../components/Home';
// import Agenda from '../components/Agenda';
import Agenda from '../components/AgendaBizzabo';
import MyProfile from '../components/MyProfile/MyProfile';
import AboutPage from '../components/AboutPage';
import SpeakerPage from '../components/MyProfile/SpeakerPage';
import SpeakerEditPage from '../components/MyProfile/SpeakerEditPage';
import SessionPage from '../components/SessionPage/SessionPage';
import SessionEditPage from '../components/SessionPage/SessionEditPage';
// import SpeakersPage from '../components/SpeakersPage2';
import SpeakersPage from '../components/SpeakersPageBizzabo';
import SponsorsPage from '../components/SponsorsPage/SponsorsPage.jsx';
import SponsorPage from '../components/PremiumSponsorPage/PremiumSponsorPage';
// import RegisterPage from "../components/RegisterPage";
import LocationPage from '../components/LocationPage';
import TeamPage from '../components/TeamPage';
import AdminPage from '../components/AdminPage';
import AdminVotesDashboard from '../components/AdminVotesDashboard';
// import WomenGathering from '../components/WomenGathering';
import CFPPage from '../components/CFP/CFPPage';
import CFPSubmission from '../components/CFP/CFPSubmission';
import ProposalsPage from '../components/ProposalsPage';
import SessionsPage from '../components/SessionsPage';
import TimelinePage from '../components/TimelinePage';

import ScrollToTop from '../components/ScrollToTop';

export default [
  {path: '/', comp: Home},
  {path: '/about', comp: AboutPage},
  {path: '/profile', comp: MyProfile},
  // { path: "/register", comp: RegisterPage },
  {path: '/agenda', comp: Agenda},
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
  {path: '/admin/votes', comp: AdminVotesDashboard},
  // { path: "/women-gathering", comp: WomenGathering },
  // {path: '/my-votes', comp: ProposalsPage, props: {myVotes: true}},
  {path: '/cfp', comp: CFPPage},
  {path: '/cfp/submission', comp: CFPSubmission},
  {path: '/sessions', comp: SessionsPage},
  {path: '/proposals', comp: ProposalsPage},
  {path: '/timeline', comp: TimelinePage},
].map(({path, comp}) => ({path, comp: ScrollToTop(comp)}));

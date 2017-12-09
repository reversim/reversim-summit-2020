const about =    { to: "about", text: "About", external: true };
const register = { to: "register", text: "Register", noScroll: true, external: true };
const team =     { to: "team", text: "Team", external: true };
const location = { to: "location", text: "Getting there", noScroll: true, external: true };
const speakers = { to: "speakers", text: "Speakers", noScroll: true, external: true };
const sponsors = { to: "sponsors", text: "Sponsors", noScroll: true, external: true };
const schedule = { to: "schedule", text: "Schedule", noScroll: true, external: true };

export default (isHome) => {
  let items = [
    about,
    register,
    speakers,
    schedule,
    location,
    team,
    sponsors
  ];

  if (!isHome) {
    items = items.map(item => ({ noScroll: true, ...item }));
  }

  return items;
}
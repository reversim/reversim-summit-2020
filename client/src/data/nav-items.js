const about =    { to: "about", text: "About" };
const register = { to: "register", text: "Register", noScroll: true };
const team =     { to: "team", text: "Team" };
const location = { to: "location", text: "Getting there", noScroll: true };
const speakers = { to: "speakers", text: "Speakers", noScroll: true };
const sponsors = { to: "sponsors", text: "Sponsors", noScroll: true };
const schedule = { to: "schedule", text: "Schedule", noScroll: true };

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
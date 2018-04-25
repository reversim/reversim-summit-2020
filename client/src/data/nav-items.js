import { isServer } from '../utils';

// const register  = { to: "register", text: "Register" };
const team 		  = { to: "team", text: "Team" };
const location  = { to: "location", text: "Getting there" };
const speakers  = { to: "speakers", text: "Speakers" };
const sponsors  = { to: "sponsors", text: "Sponsors" };
const schedule  = { to: "schedule", text: "Schedule" };
const proposals = { to: "proposals", text: "Proposals" };
const timeline	= { to: "timeline", text: "Timeline" };

export default () => {
	let items;

	if (isServer) {
		items = [
			speakers,
			schedule,
			location,
			sponsors
		].map(item => ({
			...item,
			external: true,
			to: `/${item.to}.html`
		}));
	} else {
		items = [
      proposals,
      timeline,
      location,
      team,
			sponsors
    ];
	}

	return items;
}
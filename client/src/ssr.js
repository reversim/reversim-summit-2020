import { createElement } from 'react';
import { getInitialData } from './data-service';
const { renderToString } = require('react-dom/server');
import routes from './data/routeComps';
import fs from 'fs';
import { resolve } from 'path';
import App from './components/App';
import './sass/bootstrap.scss';


process.on('unhandledRejection', err => {
	throw err;
});

const indexHTML = fs.readFileSync(resolve(__dirname, '../build/template.html'))
	.toString()
	.replace('<script type="text/javascript" src="render.js"></script>', '');

const renderFile = (path, filename, folder = '') => {
	console.log("rendering", path);
	let html = renderToString(createElement(App, { location: path }));
	html = indexHTML.replace('<!--ssr-->', html);
	fs.writeFileSync(resolve(__dirname, '../build', folder, filename), html);
};

const initData = async () => {
	const data = await getInitialData();

  for (const userId in data.users) {
    const user = data.users[userId];
    user.href = `${user._id}.html`;
  }

  for (const proposal of data.proposals) {
    proposal.href = `${proposal.id}.html`;
  }

  return data;
};

initData().then((store) => {
	routes.forEach(({ path, comp }) => {
		if (path === "/speaker/:id") {
			const { speakers } = store;
			speakers.forEach((speaker) => {
				const speakerId = speaker._id;
				renderFile(`/speaker/${speakerId}`, `${speakerId}.html`, 'speaker');
			});
		} else if (path === "/session/:id") {
			const { proposals } = store;
      proposals.forEach((session) => {
				const sessionId = session.id;
				if (sessionId) {
          renderFile(`/session/${sessionId}`, `${sessionId}.html`, 'session');
				} else {
					console.log("skipping session", session._id);
				}
			});
		} else {
			const filename = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
			renderFile(path, filename);
		}
	});
});
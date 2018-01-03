import { createElement } from 'react';
const { renderToString } = require('react-dom/server');
import store, { initStore } from './store';
import routes from './data/routeComps';
import fs from 'fs';
import { resolve } from 'path';
import { toJS } from 'mobx';
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
	html = indexHTML.replace('<!--ssr-->', `${html}<script>window.__INITIAL_STATE__=${JSON.stringify(toJS(store))}</script>`);
	fs.writeFileSync(resolve(__dirname, '../build', folder, filename), html);
};

initStore().then(() => {
	routes.forEach(({ path, comp }) => {
		if (path === "/speaker/:id") {
			const { speakers } = store;
			speakers.forEach((speaker) => {
				const speakerId = speaker._id;
				renderFile(`/speaker/${speakerId}`, `${speakerId}.html`, 'speaker');
			});
		} else if (path === "/session/:id") {
			const { sessions } = store;
			sessions.forEach((session) => {
				const sessionId = session.id;
				renderFile(`/session/${sessionId}`, `${sessionId}.html`, 'session');
			});
		} else {
			const filename = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
			renderFile(path, filename);
		}
	});
});
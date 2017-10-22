import { createElement } from 'react';
const { renderToString } = require('react-dom/server');
import store, { initStore } from './store';
import routes from './data/routeComps';
import fs from 'fs';
import { resolve } from 'path';
import { toJS } from 'mobx';
import App from './components/App';


process.on('unhandledRejection', err => {
	throw err;
});

const indexHTML = fs.readFileSync(resolve(__dirname, '../build/index.html')).toString();

initStore().then(() => {
	routes.forEach(({ path, comp }) => {
		let html = renderToString(createElement(App, { location: path }));
		const filename = path === '/' ? 'app.html' : `${path.slice(1)}.html`;
		html = indexHTML.replace('{{ssr}}', `${html}<script>window.__INITIAL_STATE__=${JSON.stringify(toJS(store))}</script>`);
		fs.writeFileSync(resolve(__dirname, '../build', filename), html);
	});
});
require("./client/scripts/start");

const nodemon = require('nodemon');

nodemon({
	script: './server/index.js',
	ext: 'js json',
	watch: ['./server']
});

nodemon.on('start', function () {
	console.log('App has started');
}).on('quit', function () {
	console.log('App has quit');
	process.exit();
}).on('restart', function (files) {
	console.log('App restarted due to: ', files);
});

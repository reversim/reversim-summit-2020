const { spawn } = require("child_process");
const path = require("path");
const images = require("../.private/images.json");

images.forEach(img => {
	const { _id: name, picture } = img;
	const ext = picture.match(/\.(.{3})$/)[1];
	const file = `${name.replace(/\s/, "_")}.${ext}`;
	const filepath = path.resolve(__dirname, "..", ".private", "pictures", file);
	const wget = spawn("wget", [picture, "-O", filepath]);

	wget.on('close', (code) => {
		console.log('exit ' + code + ' for ' + filepath);
	});
});
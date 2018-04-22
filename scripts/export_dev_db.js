const fs = require('fs');

let counter = 0;

const PUBLIC_FIELDS = {
	proposals: [
		'_id',
		'id',
		'title',
		'abstract',
		'type',
		'speaker_ids',
		'tags',
		'status',
		'created_at',
		'updated_at'
	],
	users: [
		'_id',
		'isReversimTeamMember',
		'isDataAdmin',
		'proposals',
		'created_at',
		'name',
		'oneLiner',
		'bio',
		'gender',
		'website',
		'picture',
		'linkedin',
		'twitter',
		'github',
		'stackOverflow'
	]
};

const PRIVATE_FIELDS = {
	proposals: [
		'outline',
		'attendees',
	],
	users: [
		'email',
		'tokens',
		'google',
		'phone',
		'trackRecord',
    'video_url',
	]
};

function setField(field, output, input) {
	const fieldPath = field.split('.');
	let currOutput = output, currInput = input;
	fieldPath.forEach((f, i) => {
		if (i === fieldPath.length -1) {
			if (typeof input === 'object') {
				if (currInput) {
					currOutput[f] = currInput[f];
				}
			} else {
				currOutput[f] = input;
			}
		} else {
			currOutput = currOutput[f] = currOutput[f] || {};
			currInput = currInput[f];
		}
	});
}

function transformCollection(name, folder, publicFields, privateFields) {
	const fileStr = fs.readFileSync(`${folder}/${name}.json`).toString();
	const str = `[${fileStr.replace(/\n/g, ',').replace(/,$/, '')}]`;
	const collection = JSON.parse(str);

	const collectionDev = collection.map(o => {
		const newObject = {};
		publicFields.forEach(field => { setField(field, newObject, o); });
		privateFields.forEach(field => { setField(field, newObject, `Dummy ${field.split('.').slice(-1)[0]} ${counter++}`); });
		return newObject;
	});

	const collectionDevStr = collectionDev.map(JSON.stringify).join('\n');
	const collectionOutputFile = `data/${name}.json`;
	fs.writeFileSync(`./${collectionOutputFile}`, collectionDevStr);
	console.log(`exported ${collectionDev.length} ${name} to ${collectionOutputFile}`);
}

const folder = process.argv[2];
const collections = fs.readdirSync(folder).map(x => x.replace(/\.json$/, ''));
collections.forEach(c => {
	transformCollection(c, folder, PUBLIC_FIELDS[c], PRIVATE_FIELDS[c]);
});

console.log('done');
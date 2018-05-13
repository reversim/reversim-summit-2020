const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.resolve(__dirname, '..',  'data', 'proposals.json')).toString();
const proposalsStr = `[${fileContent.replace(/\n/g, '\n,')}]`;
const proposals = JSON.parse(proposalsStr);

const userContent = fs.readFileSync(path.resolve(__dirname, '..',  'data', 'users.json')).toString();
const usersStr = `[${userContent.replace(/\n/g, '\n,')}]`;
const users = JSON.parse(usersStr);


const outputStr = proposals.map((p, i) => `-=-= #${i+1} ${p.title} (${p.speaker_ids.map(({$oid}) => users.find(u => u._id.$oid === $oid).profile.name)}) =-=-\n${p.abstract}`).join('\n\n');

fs.writeFileSync(path.resolve(__dirname, '..', '2017_abstracts.txt'), outputStr);

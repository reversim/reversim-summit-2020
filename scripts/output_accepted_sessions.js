const fs = require('fs');
const {resolve} = require('path');
const pathToData = resolve(process.argv[2]);

const fileContent = fs.readFileSync(resolve(pathToData, 'proposals.json')).toString();
const proposalsStr = `[${fileContent.replace(/\n/g, '\n,').replace(/,$/, '')}]`;
fs.writeFileSync(resolve(__dirname, 'p.json'), proposalsStr);
const proposals = JSON.parse(proposalsStr);

const userContent = fs.readFileSync(resolve(pathToData, 'users.json')).toString();
const usersStr = `[${userContent.replace(/\n/g, '\n,').replace(/,$/, '')}]`;
const users = JSON.parse(usersStr);

const acceptedIds = JSON.parse(
  fs.readFileSync(resolve(__dirname, '..', 'data', 'acceptedIds.json')).toString(),
);
const sessions = proposals.filter(p => acceptedIds.includes(p._id.$oid));
const speakersIds = Array.from(
  new Set(sessions.reduce((acc, s) => acc.concat(s.speaker_ids.map(({$oid}) => $oid)), [])),
);
const speakers = speakersIds
  .map(id => users.find(u => u._id.$oid === id))
  .sort((s1, s2) => (s1.oneLiner.length > s2.oneLiner.length ? -1 : 1));

const outputStr = sessions
  .map(
    (p, i) =>
      `-=-= #${i + 1} ${p.title} (${p.speaker_ids.map(
        ({$oid}) => users.find(u => u._id.$oid === $oid).name,
      )}) =-=-\n${p.abstract}`,
  )
  .join('\n\n');

fs.writeFileSync(resolve(pathToData, 'abstracts.txt'), outputStr);
fs.writeFileSync(resolve(pathToData, 'titles.txt'), proposals.map(p => p.title).join('\n'));
fs.writeFileSync(
  resolve(pathToData, 'speakers.txt'),
  speakers.map(s => `${s.name} (${s.oneLiner.length}): ${s.oneLiner}`).join('\n'),
);
console.log(Math.max.apply(Math, speakers.map(s => s.oneLiner.length)));

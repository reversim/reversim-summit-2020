'use strict';
require('dotenv').config();
const cloudinary = require('cloudinary');
const {MongoClient} = require('mongodb');
const fs = require('fs');
const {resolve} = require('path');
const {promisify: p} = require('util');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ReversimSummit18';
const sponsors = [
  'amazon',
  'appliedMaterials',
  'appsflyer',
  'bubblesort',
  'cloudinary',
  'cyberark',
  'dropbox',
  'ebay',
  'fiverr',
  'gett',
  'here',
  'iguazio',
  'joytune',
  'kenshoo',
  'liveperson',
  'microsoft',
  'myheritage',
  'outbrain',
  'searsIsrael',
  'singular',
  'soluto',
  'wework',
  'wibbitz',
  'wix',
];

const sponsorNames = [
  'Amazon',
  'Applied Materials',
  'AppsFlyer',
  'Bubblesort',
  'Cloudinary',
  'CyberArk',
  'Dropbox',
  'eBay',
  'Fiverr',
  'Gett',
  'Here Mobility',
  'Iguazio',
  'JoyTunes',
  'Kenshoo',
  'LivePerson',
  'Microsoft',
  'My Heritage',
  'Outbrain',
  'Sears Israel',
  'Singular',
  'Soluto',
  'WeWork',
  'WIBBITZ',
  'Wix',
];

const urls = JSON.parse(
  fs.readFileSync(resolve(__dirname, '../data/sponsor_logos.json')).toString(),
);
MongoClient.connect(
  mongoUrl,
  async function(err, client) {
    if (err) {
      console.log(err);
      return;
    }
    const db = client.db(dbName);
    const collection = db.collection('sponsors');
    for (const [i, name] of sponsorNames.entries()) {
      const id = sponsors[i];
      const [logo, logoHover] = urls[id];
      console.log('updating', name, id, logo, logoHover);
      await p(collection.updateOne.bind(collection))({name}, {$set: {logo, logoHover}});
    }
    client.close();
  },
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// (async function() {
//   const urls = {};
//   for (const sponsor of sponsors) {
//     console.log(`processing ${sponsor}`);
//     const filePath = resolve(__dirname, '../client/src/images/sponsors', `${sponsor}.png`);
//     const url = await upload(filePath);
//     const urlHover = await upload(filePath.replace('.png', '-hover.png'));
//     urls[sponsor] = [url, urlHover];
//   }
//   console.log(urls);
//   fs.writeFileSync(resolve(__dirname, '../data/sponsor_logos.json'), JSON.stringify(urls));
//   console.log('Done');
// })();

async function upload(data) {
  return new Promise(resolve => {
    cloudinary.uploader.upload(data, function(result) {
      console.log('new logo url', result.secure_url);
      resolve(result.secure_url);
    });
  });
}

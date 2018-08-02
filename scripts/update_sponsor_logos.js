'use strict';
require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');
const {resolve} = require('path');
const {promisify: p} = require('util');

// eslint-disable-next-line
const mongoUrl = `mongodb://${process.env.MONGODB_ADMIN_USER}:${process.env.MONGODB_ADMIN_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`;
const dbName = 'heroku_xqplfw4b';
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
  'moovit',
  'monday',
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
  'Moovit',
  'monday.com',
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

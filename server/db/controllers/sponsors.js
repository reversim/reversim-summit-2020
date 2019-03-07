import Sponsor from '../models/sponsor';
import passport from 'passport';
import _ from 'lodash';
import cloudinary from 'cloudinary';
import shuffler from 'shuffle-seed';

async function all(req, res) {
  const sponsors = await getAllSponsors(true);
  return res.status(200).send(sponsors);
}

async function getAllSponsors(shouldShuffle) {
  let sponsors = await Sponsor.find({});
  if (shouldShuffle) {
    const shuffleSeed = String(Date.now());
    sponsors = shuffler.shuffle(sponsors, shuffleSeed);
  }

  return sponsors;
}

async function add(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  let sponsor = _.clone(req.body);

  sponsor.created_at = new Date();
  sponsor.updated_at = new Date();
  const socials = (sponsor) => {
    let socials = []
    if(sponsor.linkedIn) socials.push({medium: 'linkedin', link: sponsor.linkedIn});
    if(sponsor.github) socials.push({medium: 'github', link: sponsor.github});
    if(sponsor.facebook) socials.push({medium: 'facebook', link: sponsor.facebook});
    if(sponsor.twitter) socials.push({medium: 'twitter', link: sponsor.twitter});
    if(sponsor.medium) socials.push({medium: 'medium', link: sponsor.medium});

    return socials;
  }
  let newSponsor;

  if (sponsor.isPremium) {
    newSponsor = {
      name: sponsor.name,
      logo: sponsor.logo,
      location: {
        link: sponsor.locationLink,
        shortAddress: sponsor.locationShortAddress
      },
      socials: socials(sponsor),
      oneLiner: sponsor.oneLiner,
      about: sponsor.about,
      techStory: {
        text: sponsor.techStory.text,
        technologies: sponsor.techStory.technologies.split('\n')
      },
      openPositions: sponsor.openPositions,
      url: sponsor.url,
      reversimAndUs: sponsor.reversimAndUs,
      isPremium: sponsor.isPremium,
      images: sponsor.images,

      created_at: new Date(),
      updated_at: new Date(),
    }
  } else {
    sponsor.created_at = new Date();
    sponsor.updated_at = new Date();
    newSponsor = sponsor
  }
  const model = await Sponsor.create(newSponsor);
  return res.status(200).send(model);
}

async function update(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  const sponsor = await Sponsor.findOne({_id: req.params.id});
  if (!sponsor) {
    console.error('error in sponsor update - no sponsor found');
    return res.status(500).send('Something went wrong getting the data');
  } else {
    req.body.updated_at = new Date();
    req.body.logo = await uploadLogo(req.body.logo);
    const data = _.omit(req.body, ['_id']);
    await Sponsor.findOneAndUpdate({_id: req.params.id}, data);
    return res.status(200).send(data);
  }
}

function uploadLogo(data) {
  return new Promise(resolve => {
    console.log('uploading logo', data.slice(0, 150));
    cloudinary.uploader.upload(data, function(result) {
      console.log('new logo url', result.secure_url);
      resolve(result.secure_url);
    });
  });
}

async function remove(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  await Sponsor.remove({_id: req.params.id});
  return res.sendStatus(200);
}

export default {
  all,
  add,
  update,
  remove,

  getAllSponsors,
};

import Sponsor from "../models/sponsor";
import passport from "passport";
import _ from "lodash";
import cloudinary from "cloudinary";
import shuffler from "shuffle-seed";

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
const socials = sponsor => {
  let socials = [];
  if (sponsor.linkedin)
    socials.push({ medium: "linkedin", link: sponsor.linkedin });
  if (sponsor.github)
    socials.push({ medium: "github", link: sponsor.github });
  if (sponsor.facebook)
    socials.push({ medium: "facebook", link: sponsor.facebook });
  if (sponsor.twitter)
    socials.push({ medium: "twitter", link: sponsor.twitter });
  if (sponsor.medium)
    socials.push({ medium: "medium", link: sponsor.medium });

  return socials;
};

async function add(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  let sponsor = _.clone(req.body);

  sponsor.created_at = new Date();
  sponsor.updated_at = new Date();

  let newSponsor;

  if (sponsor.isPremium) {
    newSponsor = {
      name: sponsor.name,
      logo: await uploadLogo(req.body.logo),
      location: {
        link: sponsor.locationLink || "",
        shortAddress: sponsor.locationShortAddress || ""
      },
      socials: socials(sponsor),
      oneLiner: sponsor.oneLiner || "",
      about: sponsor.about || "",
      techStory: {
        text: sponsor.techStory.text || "",
        technologies: sponsor.techStory.technologies.split("\n") || []
      },
      openPositions: sponsor.openPositions || [],
      url: sponsor.url || "",
      reversimAndUs: sponsor.reversimAndUs || "",
      isPremium: sponsor.isPremium || "",
      images: await Promise.all(sponsor.images.map(image => uploadLogo(image))),
      created_at: new Date(),
      updated_at: new Date()
    };
  } else {
    newSponsor = {
      name: sponsor.name,
      logo: await uploadLogo(req.body.logo),
      about: sponsor.about || "",
      url: sponsor.url || "",
      jobUrl: sponsor.jobUrl,
      created_at: new Date(),
      updated_at: new Date()
    };
  }
  const model = await Sponsor.create(newSponsor);
  return res.status(200).send(model);
}

async function update(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  const sponsor = await Sponsor.findOne({ _id: req.params.id });
  if (!sponsor) {
    console.error("error in sponsor update - no sponsor found");
    return res.status(500).send("Something went wrong getting the data");
  } else {
    let newSponsor;

    if (sponsor.isPremium) {
      newSponsor = {
        name: req.body.name,
        logo: await uploadLogo(req.body.logo),
        location: {
          link: req.body.locationLink || "",
          shortAddress: req.body.locationShortAddress || ""
        },
        socials: socials(req.body),
        oneLiner: req.body.oneLiner || "",
        about: req.body.about || "",
        techStory: {
          text: req.body.techStory.text || "",
          technologies: (req.body.techStory.technologies || '').split("\n") || []
        },
        openPositions: req.body.openPositions || [],
        url: req.body.url || "",
        reversimAndUs: req.body.reversimAndUs || "",
        isPremium: req.body.isPremium || "",
        images: await Promise.all(req.body.images.map(image => uploadLogo(image))),
        updated_at: new Date()
      };
    } else {
      newSponsor = {
        name: req.body.name,
        logo: await uploadLogo(req.body.logo),
        about: req.body.about || "",
        url: req.body.url || "",
        jobUrl: req.body.jobUrl,
        updated_at: new Date()
      };
    }




    // req.body.updated_at = new Date();
    // req.body.logo = await uploadLogo(req.body.logo);
    //
    // req.body.images = await Promise.all(
    //   req.body.images.map(image => uploadLogo(image))
    // );
    // if(req.body.socials) req.body.socials= socials(req.body.socials);
    // if(req.body.technologies)
    // const data = _.omit(req.body, ["_id"]);
    await Sponsor.findOneAndUpdate({ _id: req.params.id }, newSponsor);
    return res.status(200).send(newSponsor);
  }
}

function uploadLogo(data) {
  const cloudinaryCloudName = "dtltonc5g";
  return new Promise((resolve, reject) => {
    let prefix = "https://res.cloudinary.com/" + cloudinaryCloudName;
    if (!data || data.indexOf(prefix) == 0) {
      // Logo is empty or already in cloudinary, no need to upload
      resolve(data);
      return;
    }
    console.log("uploading to cloudinary ", data.slice(0, 150));
    let opts = {};
    if (data.indexOf("data:video/") == 0) {
      // This is a video. Requires special options
      opts.resource_type = "video";
    }
    cloudinary.v2.uploader.upload(data, opts, function(error, result) {
      if (error) {
        console.error("Error uploading to cloudinary: %s", error)
        reject(error);
        return
      }
      console.log("New cloudinary resource url", result.secure_url);
      resolve(result.secure_url);
    });
  });
}

async function remove(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  await Sponsor.remove({ _id: req.params.id });
  return res.sendStatus(200);
}

export default {
  all,
  add,
  update,
  remove,

  getAllSponsors
};

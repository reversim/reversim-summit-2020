/**
 * Created by oriharel on 31/05/2016.
 */
import _ from 'lodash';
import keyBy from 'lodash/keyBy';
import Proposal from '../models/proposal';
import User from '../models/user';
import {transformProposal, transformUser} from './helpers';
import shuffler from 'shuffle-seed';
import request from 'axios';
import eventConfig from '../../init/eventConfig';
// TODO this is duplicate from /client/src/data/proposals.js
const PROPOSAL_TYPES = {
  "full": "Full Featured (30 min.)",
  "postmortem": "Postmortem (15 min.)",
  "lightning": "Lightning Talk (5 min.)",
  "ossil": "Open Source in Israel (10 min.)"
};

const errorHandler = (res, err) => {
  console.log(`Error in proposals query: ${err}`);
  return res.status(500).send('Something went wrong getting the data');
};

/**
 * Tags List
 */
async function tags(req, res) {
  try {
    const tags = await getTagsFromDb();
    res.json(tags.filter(tag => !!tag._id).map(tag => tag._id).sort());
  } catch(err) {
    errorHandler(res, err);
  }
}

/**
 * Single Proposal
 */
async function get(req, res) {
  try {
    const proposal = await getProposal(req.params.id);
    res.json(transformProposal(proposal, req.user))
  } catch(err) {
    errorHandler(res, err);
  }
}

async function getAll(req, res) {
  try {
    const seed = req.user ? req.user.created_at : String(Date.now());
    const proposals = await getAllProposals(true, seed);
    res.json(keyBy(proposals.map(proposal => transformProposal(proposal, req.user)), '_id'));
  } catch(ex) {
    errorHandler(res, err);
  }
}

/**
 * Add a Proposal
 */
export function add(req, res) {
  const coSpeaker = req.body.coSpeaker;
  delete req.body.coSpeaker;
  User.findOne({ email: coSpeaker }).exec((err, user) => {
    if (user) {
      req.body.speaker_ids.push(String(user._id))
    }
    if (!req.user || !eventConfig().cfp) return res.sendStatus(401);
    if (req.body.speaker_ids.indexOf(String(req.user._id)) === -1 && !req.user.isReversimTeamMember) {
      return res.sendStatus(401);
    }

    let proposal = _.clone(req.body);

    proposal.created_at = new Date();
    proposal.updated_at = new Date();

    console.log('adding new proposal ' + JSON.stringify(proposal));

    Proposal.create(proposal, (err, model) => {
      if (err) {
        console.log(`Error in proposals/add query: ${err}`);
        return res.status(500).send('Something went wrong');
      }

      // Update speakers proposals
      Promise.all(proposal.speaker_ids.map(speaker_id => User.findByIdAndUpdate(
        speaker_id,
        { $push: { 'proposals': model._id } },
        { safe: true, upsert: true }
      ))).then(speakers => {
        res.status(200).send(transformProposal(model, req.user));
      }).catch(ex => {
        console.log(`Error in proposals/add/updateUser query: ${ex}`);
        return res.status(500).send('Something went wrong');
      });

      Promise.all(proposal.speaker_ids.map(speaker_id => {
        return User.findOne({ _id: speaker_id });
      })).then(speakers => {
        Proposal.count({ status: { $ne: 'archived' } }).then(proposalCount => {
          const authorName = speakers.map(speaker => speaker.name).join(" & ");
          request({
            url: process.env.SLACK_URL,
            method: "POST",
            data: {
              username: "CFP Alert",
              text: `#${proposalCount} ${authorName} submitted: ${proposal.title}`,
              channel: process.env.NODE_ENV === 'production' ? "#cfp" : null,
              attachments: [
                {
                  title: proposal.title,
                  author_name: authorName,
                  author_link: `https://summit2019.reversim.com/session/${model._id}`,
                  author_icon: speakers[0].picture,
                  text: speakers[0].email
                },
                {
                  "title": "Session type",
                  "color": "#17a2b8",
                  "text": PROPOSAL_TYPES[proposal.type]
                },
                {
                  "title": "Categories",
                  "color": "#28a745",
                  "text": proposal.categories ? proposal.categories.join(", ") : ""
                },
                {
                  "title": "Tags",
                  "color": "#ffc107",
                  "text": proposal.tags ? proposal.tags.join(", ") : ""
                },
                {
                  text: proposal.abstract,
                  color: "#6b1ee6"
                }
              ]
            }
          });
        });
      });
    });
  });
}

/**
 * Update a proposal
 */
async function update(req, res) {
  if (!req.user) return res.sendStatus(401);
  const proposal = await Proposal.findOne({ _id: req.params.id });
  const coSpeaker = req.body.coSpeaker;
  delete req.body.coSpeaker;
  const coSpeakerUser = await User.findOne({ email: coSpeaker });
  if (!proposal) {
    console.error('error in proposal update - no proposal found');
    return res.status(500).send('Something went wrong getting the data');
  } else if (proposal.speaker_ids.map(String).indexOf(String(req.user._id)) === -1 && !req.user.isReversimTeamMember) {
    console.error('unauthorized to update proposal');
    return res.status(401).send('Unauthorized to update proposal');
  } else {
    const omitKeys = ['id', '_id', '_v'];
    if (coSpeakerUser) {
      const coSpeakerId = String(coSpeakerUser._id);
      // if the user is not one of the speakers, make it the coSpeaker
      if(proposal.speaker_ids.indexOf(coSpeakerId) === -1) {
        proposal.speaker_ids[1] = coSpeakerId;
      }
      req.body.speaker_ids = proposal.speaker_ids;
    } else if(!coSpeaker) {
      // if coSpeaker is empty, remove the coSpeaker
      req.body.speaker_ids = [proposal.speaker_ids[0]];
    }
    req.body.updated_at = new Date();
    const data = _.omit(req.body, omitKeys);

    // TODO just update, don't findOne
    Proposal.findOneAndUpdate({ _id: req.params.id }, data, (err, obj) => {
      if (err) {
        console.log(`Error in proposals/update query: ${err}`);
        return res.status(500).send('Something went wrong getting the data');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Remove a proposal
 */
async function remove(req, res) {
  if (!req.user) return res.sendStatus(401);
  const proposal = await Proposal.findOne({ _id: req.params.id });
  if (!proposal) {
    console.error('error in proposal delete - no proposal found');
    return res.status(500).send('Something went wrong getting the data');
  } else if (proposal.speaker_ids.map(String).indexOf(String(req.user._id)) === -1 && !req.user.isReversimTeamMember) {
    console.error('unauthorized to delete proposal');
    return res.status(401).send('Unauthorized to delete proposal');
  } else {
    const query = { _id: req.params.id };
    const data = { status: 'archived' };
    console.log('removing proposal ' + JSON.stringify(query));

    // TODO just update, don't findOne
    Proposal.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log(`Error in proposals/remove query: ${err}`);
        return res.status(500).send('Something went wrong');
      }

      return res.status(200).send('Removed Successfully');
    });
  }
}

/**
 * Attend a proposal
 */
function attend(req, res) {
  if (!req.user || !eventConfig().voting) return res.sendStatus(401);

  let query, update, msg;
  if (req.body.value === true) {
    query = { _id: req.params.id, status: { $ne: 'archived' }, attendees: { $nin: [req.session.passport.user] } };
    update = {
      $push: { 'attendees': req.session.passport.user },
      $pull: { 'notAttendees': req.session.passport.user }
    };
    msg = 'Marked as attended';
  } else if (req.body.value === false) {
    query = { _id: req.params.id, status: { $ne: 'archived' }, attendees: { $in: [req.session.passport.user] } };
    update = {
      $pull: {'attendees': req.session.passport.user},
      $push: {'notAttendees': req.session.passport.user }
    };
    msg = 'Marked as not attended';
  } else {
    query = { _id: req.params.id, status: { $ne: 'archived' }, attendees: { $nin: [req.session.passport.user] } };
    update = {
      $pull: {'attendees': req.session.passport.user },
      $pull: {'notAttendees': req.session.passport.user}
    };
    msg = 'Marked as not voted';
  }

  Proposal.findOneAndUpdate(query, update, (err, obj) => {
    if (err) {
      console.log(`Error in proposals/attend query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.status(200).send(msg);
  });
}

/**
 * Get Speakers
 */
async function getSpeakers(req, res) {
  try {
    const p = await getAcceptedProposals();
    const users = await getProposers(p);
    res.json(users.map(u => transformUser(u, req.user)));
  } catch(err) {
    errorHandler(res)
  }
}

async function proposers(req, res) {
  try {
    const start = Date.now();
    const allProposals = await getAllProposals();
    const proposers = await getProposers(allProposals);
    res.json(keyBy(proposers.map(u => transformUser(u, req.user)), '_id'));
  } catch(err) {
    errorHandler(res)
  }
}

function sessions(req, res) {
  const start = Date.now();
  getAcceptedProposals()
    .then(proposals => res.json(proposals))
    .then(() => console.log(Date.now() - start))
    .catch(err => {
      console.log(`Error in proposals/speakers query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    });

  // return res.json(proposals.map(p => transformProposal(p, req.user)));
}

const attendDataQuery = [
  { $unwind: "$attendees" },
  { $group: {
    _id: "$attendees",
    totalPerVoter: {
      $sum: 1
    }
  }},
  { $group: {
    _id: null,
    uniqueVoters: {
      $sum: 1
    },
    averagePerVoter: {
      $avg: "$totalPerVoter"
    },
    totalVotes: {
      $sum: "$totalPerVoter"
    }
  }}
];

const votesQuery = [
  {
    $match: {
      status: { 
        $nin: ['archived', 'deleted'] 
      }
    }
  },
  {
    $project: {
      _id: "$_id",
      title: "$title",
      speakers: "$speakers",
      votes: {$size: "$attendees"}
    }
  },
  { 
    $sort: { 
      votes: -1 
    }
  }
];

function getAllAttendees(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) {
    return res.send(401);
  }

  let query = votesQuery;

  Promise.all([
    Proposal.aggregate(query).exec(),
    Proposal.aggregate(attendDataQuery).exec()
  ]).then(([proposals, aggs]) => {
    return res.json({ proposals, aggs: aggs[0] });
  }).catch(err => {
    console.log(`Error in proposal/attendees query: ${err}`);
    return res.status(500).send('Something went wrong getting the data');
  });
}

function getProposers(proposals) {
  const userIds = _.uniq(_.flatMap(proposals, proposal => proposal.speaker_ids), '_id');
  return User.find({ _id: { $in: userIds }});
}

async function getAllProposals(shouldShuffle, seed) {
  let proposals = await Proposal.find({ status: { $nin: ['archived', 'deleted'] }}, null, { sort: { created_at: -1 } });
  if (shouldShuffle) {
    proposals = shuffler.shuffle(proposals, seed);
  }
  return proposals;
}

function getAcceptedProposals() {
  return Proposal.find({ status: 'accepted' }, null, { sort: { created_at: -1 } });
}

function getTagsFromDb() {
  return Proposal.aggregate([
    { $project: { tags: 1 } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } }
  ]);
}

function getTags(proposals) {
  return _.uniq(_.flatMap(proposals, p => p.tags).map(t=>t.toLowerCase())).sort();
  // return _.uniq(_.flatMap(proposals, p => p.tags)).sort();
}

function getProposal(id) {
  return Proposal.findOne({ _id: id });
}


export default {
  get,
  getAll,
  add,
  update,
  remove,
  attend,
  tags,
  getSpeakers,
  sessions,
  proposers,
  getAllAttendees,

  getAllProposals,
  getAcceptedProposals,
  getProposers,
  getTags
};

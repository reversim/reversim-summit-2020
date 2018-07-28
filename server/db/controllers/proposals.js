/**
 * Created by oriharel on 31/05/2016.
 */
import _ from 'lodash';
import Proposal from '../models/proposal';
import User from '../models/user';
import {transformProposal, transformUser} from './helpers';
import shuffler from 'shuffle-seed';
import request from 'axios';
import eventConfig from '../../init/eventConfig';
// TODO this is duplicate from /client/src/data/proposals.js
const PROPOSAL_TYPES = {
  "full": "Full Featured (30 min.)",
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

/**
 * Add a Proposal
 */
export function add(req, res) {  
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
      { $push: {'proposals': model._id} },
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
                author_link: `https://summit2018.reversim.com/session/${model._id}`,
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
}

/**
 * Update a proposal
 */
async function update(req, res) {
  if (!req.user) return res.sendStatus(401);
  const proposal = await Proposal.findOne({ _id: req.params.id });
  if (!proposal) {
    console.error('error in proposal update - no proposal found');
    return res.status(500).send('Something went wrong getting the data');
  } else if (proposal.speaker_ids.map(String).indexOf(String(req.user._id)) === -1 && !req.user.isReversimTeamMember) {
    console.error('unauthorized to update proposal');
    return res.status(401).send('Unauthorized to update proposal');
  } else {
    const omitKeys = ['id', '_id', '_v'];
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
    update = { $push: {'attendees': req.session.passport.user } };
    msg = 'Marked as attended';
  } else {
    query = { _id: req.params.id, status: { $ne: 'archived' }, attendees: { $in: [req.session.passport.user] } };
    update = { $pull: {'attendees': req.session.passport.user} };
    msg = 'Marked as not attended';
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

function proposers(req, res) {
  const start = Date.now();
  getAllProposals()
    .then(getProposers)
    .then(users => res.json(users))
    .then(() => console.log(Date.now() - start))
    .catch(errorHandler(res));
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

const baseQuery = [
  {$unwind: "$speaker_ids"},
  {$lookup: {
    localField: "speaker_ids",
    from: "users",
    foreignField: "_id",
    as: "speaker"
  }},
  {$unwind: "$speaker"},
  {$unwind: "$attendees"},
  {$lookup: {
    localField: "attendees",
    from: "users",
    foreignField: "_id",
    as: "attendee"
  }},
  {$unwind: "$attendee"},
  {$group: {
    _id: "$id",
    link: {
      $first: {
        $concat: ["https://summit2017.reversim.com/session/", "$id"]
      }
    },
    title: { $first: "$title" },
    speaker: { $first: "$speaker.name" },
    attendees: {
      $push: { $concat: ["$attendee.name", " <", "$attendee.email", ">"] }
    },
    attendeeCount: { $sum: 1 }
  }}
];

const projectAttendeesRaw = { $project: {
  attendeeCount: 1,
  link: 1,
  title: 1,
  speaker: 1,
  attendees: 1
}};
const projectAttendees = { $project: {
  attendeeCount: 1,
  link: 1,
  title: 1,
  speaker: 1
}};
const sortAttendees = { $sort: { attendeeCount: -1 }};

const aggregateQuery = (isDataAdmin) => {
  if (isDataAdmin) {
    return baseQuery.concat([
      projectAttendeesRaw, sortAttendees
    ]);
  } else {
    return baseQuery.concat([
      projectAttendees,
      sortAttendees
    ]);
  }
};

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

function getAllAttendees(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) {
    return res.send(401);
  }

  let query;
  if (req.user.isDataAdmin) {
    query = aggregateQuery(true);
  } else if (req.user.isReversimTeamMember) {
    query = aggregateQuery(false);
  }

  Promise.all([
    Proposal.aggregate(query).exec(),
    Proposal.aggregate(attendDataQuery).exec()
  ]).then(([proposals, data]) => {
    return res.json({ proposals, data: data[0] });
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
  let proposals = await Proposal.find({ status: { $ne: 'archived' }}, null, { sort: { created_at: -1 } });
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
  return _.uniq(_.flatMap(proposals, p => p.tags)).sort();
}

function getProposal(id) {
  return Proposal.findOne({ _id: id });
}


export default {
  get,
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

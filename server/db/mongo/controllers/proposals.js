/**
 * Created by oriharel on 31/05/2016.
 */
import _ from 'lodash';
import Proposal from '../models/proposal';
import User from '../models/user';
import mongoose from 'mongoose';
import {transformProposal} from './helpers';
import shuffler from 'shuffle-seed';

const shuffleProposals = true;

/**
 * List
 */
export function all(req, res) {
    Proposal.find({ status: { $ne: 'archived' } }, null, { sort: { created_at: -1 } }).populate('speaker_ids').exec((err, proposals) => {
        if (err) {
            console.log(`Error in proposals/all query: ${err}`);
            return res.status(500).send('Something went wrong getting the data');
        }

        let result = proposals.map((proposal) => transformProposal(proposal, req.user, req.query && req.query.overrideDetails === 'true'));

        if (req.query.group === 'tags') {
          let groups = {};

          result.forEach(proposal => {
            if (proposal.tags === undefined || proposal.tags.length === 0) {
              groups['Untagged'] = groups['Untagged'] || [];
              groups['Untagged'].push(proposal);
            } else {
              proposal.tags.forEach(tag => {
                groups[tag] = groups[tag] || [];
                groups[tag].push(proposal);
              });
            }
          });

          result = groups;
        }

        if (shuffleProposals && req.user && req.user.id) {
          return res.json(shuffler.shuffle(result, req.user.id))
        } else {
          return res.json(result);
        }
    });
}

/**
 * Recommendations
 */
const totalRecommendations = 3;
const randomRecommendations = 2;

export function getRecommendations(req, res) {
  Proposal.findOne({ 'id': req.params.id }).exec()
    .catch(err => {
      console.log(`Error in recommendations/first query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    })
    .then(proposal => {
      let totalIntersectedTags = Math.min(totalRecommendations - randomRecommendations, proposal.tags.length);
      let intersectedTags = _.take(_.shuffle(proposal.tags), totalIntersectedTags);

      let query = {
        id: { '$ne': proposal.id },
        status: { $ne: 'archived' },
        tags: {
          '$elemMatch': {
            '$in': intersectedTags
          }
        }
      };
      if (req.session.passport && req.session.passport.user) {
        query['speaker_ids'] = {
          '$elemMatch': {
            '$ne': req.session.passport.user
          }
        }
      }

      return Proposal.find(query).populate('speaker_ids').limit(totalRecommendations - randomRecommendations).exec();
    })
    .catch(err => {
      console.log(`Error in recommendations/second query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    })
    .then(recommendations => {
      let query = {
        id: {
          '$nin': [
            req.params.id,
            ...recommendations.map(r => r.id)
          ]
        },
        status: { $ne: 'archived' }
      };
      if (req.session.passport && req.session.passport.user) {
        query['speaker_ids'] = {
          '$elemMatch': {
            '$ne': req.session.passport.user
          }
        }
      }

      Proposal.find(query).populate('speaker_ids').exec().then(randomRecommendations => {
        return _.shuffle([
          ...recommendations,
          ..._.take(_.shuffle(randomRecommendations), totalRecommendations - recommendations.length)
        ]);
      }).then(recs => {
        return res.json(recs.map(proposal => transformProposal(proposal, req.user)));
      });
    });
}

/**
 * Tags List
 */
export function tags(req, res) {
    Proposal.aggregate([
      { $project: { tags: 1 } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } }
    ]).exec().then(tags => {
      return res.json(tags.map(tag => tag._id).sort());
    }).catch(err => {
      console.log(`Error in proposals/tags query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    });
}

/**
 * Single Proposal
 */
export function get(req, res) {
    Proposal.findOne({'id': req.params.id}).populate('speaker_ids').exec((err, proposal) => {
        if (err) {
            console.log(`Error in proposals/get query: ${err}`);
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(transformProposal(proposal, req.user));
    });
}

/**
 * Add a Proposal
 */
export function add(req, res) {
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
        proposal.speaker_ids.forEach(speaker_id => {
          User.findByIdAndUpdate(
            speaker_id,
            { $push: {'proposals': model._id} },
            { safe: true, upsert: true },
            (err, model) => {
              if (err) {
                console.log(`Error in proposals/add/updateUser query: ${err}`);
                return res.status(500).send('Something went wrong');
              }
            }
          );
        });

        return res.status(200).send('OK');
    });
}

/**
 * Update a proposal
 */
export function update(req, res) {
    const omitKeys = ['id', '_id', '_v'];
    req.body.updated_at = new Date();
    const data = _.omit(req.body, omitKeys);

    Proposal.findOneAndUpdate({ id: req.params.id }, data, (err, obj) => {
        if (err) {
          console.log(`Error in proposals/update query: ${err}`);
          return res.status(500).send('Something went wrong getting the data');
        }

        return res.status(200).send('Updated successfully');
    });
}

/**
 * Remove a proposal
 */
export function remove(req, res) {
    const query = { id: req.params.id };
    console.log('removing proposal '+JSON.stringify(query));
    Proposal.findOneAndRemove(query, (err) => {
        if (err) {
          console.log(`Error in proposals/remove query: ${err}`);
          return res.status(500).send('Something went wrong');
        }

        return res.status(200).send('Removed Successfully');
    });
}

/**
 * Attend a proposal
 */
export function attend(req, res) {
  if (req.session.passport && req.session.passport.user) {
    let query, update;
    if (req.body.value === true) {
      query = { id: req.params.id, status: { $ne: 'archived' }, attendees: { $nin: [req.session.passport.user] } };
      update = { $push: {'attendees': req.session.passport.user } };
    } else {
      query = { id: req.params.id, status: { $ne: 'archived' }, attendees: { $in: [req.session.passport.user] } };
      update = { $pull: {'attendees': req.session.passport.user} };
    }

    Proposal.findOneAndUpdate(query, update, (err, obj) => {
        if (err) {
          console.log(`Error in proposals/attend query: ${err}`);
          return res.status(500).send('Something went wrong getting the data');
        }

        return res.status(200).send('Marked as attended');
    });
  } else {
    return res.status(403).send('Unauthorized');
  }
}

export default {
    all,
    get,
    add,
    update,
    remove,
    attend,
    tags,
    getRecommendations
};

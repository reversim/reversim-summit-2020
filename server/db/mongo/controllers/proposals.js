/**
 * Created by oriharel on 31/05/2016.
 */
import _ from 'lodash';
import Proposal from '../models/proposal';
import User from '../models/user';
import mongoose from 'mongoose';

/**
 * List
 */
export function all(req, res) {
    //console.log('proposal all started...');
    Proposal.find({}).populate('speaker_ids').exec((err, proposals) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        //console.log('proposal all returning '+JSON.stringify(proposals));

        return res.json(proposals);
    });
}

/**
 * Single Proposal
 */
export function get(req, res) {
    Proposal.findOne({'id': req.params.id}).populate('speaker_ids').exec((err, proposal) => {
        if (err) {
            console.log('Error in first query: ' + err);
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(proposal);
    });
}

/**
 * Add a Proposal
 */
export function add(req, res) {
    let proposal = _.clone(req.body);

    proposal.created_at = new Date();
    proposal.updated_at = new Date();

    console.log('adding new proposal '+JSON.stringify(proposal));

    Proposal.create(proposal, (err, model) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }

        // Update speakers proposals
        proposal.speaker_ids.forEach(speaker_id => {
          User.findByIdAndUpdate(
            speaker_id,
            { $push: {'proposals': model._id} },
            { safe: true, upsert: true },
            (err, model) => {
              if (err) {
                console.log('Error in first query: ' + err);
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
            console.log('Error on save!');
            return res.status(500).send('We failed to save for some reason');
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
            console.log('Error on delete');
            return res.status(500).send('We failed to delete for some reason');
        }

        return res.status(200).send('Removed Successfully');
    });
}

export default {
    all,
    get,
    add,
    update,
    remove
};

/**
 * Created by oriharel on 31/05/2016.
 */
import _ from 'lodash';
import Proposal from '../models/proposal';

/**
 * List
 */
export function all(req, res) {
    Proposal.find({}).exec((err, proposals) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(proposals);
    });
}

/**
 * Add a Proposal
 */
export function add(req, res) {
    console.log('adding new proposal '+JSON.stringify(req.body));
    Proposal.create(req.body, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }

        return res.status(200).send('OK');
    });
}

/**
 * Update a proposal
 */
export function update(req, res) {
    const query = { id: req.params.id };
    const omitKeys = ['id', '_id', '_v'];
    const data = _.omit(req.body, omitKeys);

    Proposal.findOneAndUpdate(query, data, (err) => {
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
    add,
    update,
    remove
};


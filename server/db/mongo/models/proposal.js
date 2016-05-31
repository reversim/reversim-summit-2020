/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ProposalSchema = new mongoose.Schema({
    id: String,
    title: String,
    abstract: String,
    type: String,
    speaker_ids: [String],
    votes: {},
    comments: [String],
    editing: Boolean,
    deleted: Boolean,
    status: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Proposal', ProposalSchema);


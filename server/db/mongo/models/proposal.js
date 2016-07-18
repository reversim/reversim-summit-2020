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
    speaker_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [String],
    tags: [String],
    editing: Boolean,
    deleted: Boolean,
    status: {
      type: String,
      default: 'proposed'
    },
    created_at: Date,
    updated_at: Date
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Proposal', ProposalSchema);

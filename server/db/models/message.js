import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
	id: String,
	text: String
});

export default mongoose.model('Message', MessageSchema);

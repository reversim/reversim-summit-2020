import Message from '../models/message';

async function getMessages(req, res) {
	try {
    const messages = await getAllMessages();
    res.status(200).send(messages);
	} catch(err) {
    console.log("error in getMessages", err);
    return res.status(500).send('error in messages');
	}
}

function getAllMessages() {
	return Message.find({}, null, { sort: { created_at: -1 }});
}

function addMessage(req, res) {
	if (!req.user || !req.user.isReversimTeamMember) {
		return res.send(401);
	}

	const msg = {
		created_at: new Date(),
		text: req.body.data
	};
	Message.create(msg, (err, model) => {
		if (err) {
			console.log("error in addMessage", err);
			return res.status(500).send('error in adding message');
		}

		res.status(200).send(model);
	});
}

function removeMessage(req, res) {
	if (!req.user || !req.user.isReversimTeamMember) {
		return res.send(401);
	}

	Message.findOneAndRemove({ _id: req.params.id }, err => {
		if (err) {
			console.log("error in removeMessage", err);
			return res.status(500).send('error in removing message');
		}

		res.status(200).send({ success: true });
	});
}

async function internalGetAll(req, res) {
  const { q } = req.query;
  const where = {};

  if (q) {
    where.text = {
      $regex: q,
      $options: 'i'
    };
  }

  return res.json(await Message.find(where));
}

async function internalUpdate(req, res) {
  const { _id } = req.params;
  const where = { _id };

  return res.json(await Message.updateOne(where, { $set: Object.assign({}, req.body, { updated_at: new Date() }) }));
}

async function internalCreate(req, res) {
  return res.json(await Message.create(Object.assign({}, req.body, { created_at: new Date() })));
}

async function internalDelete(req, res) {
  const { _id } = req.params;
  const where = { _id };

  return res.json(await Message.deleteOne(where));
}

export default {
	getMessages,
	addMessage,
	removeMessage,
	getAllMessages,
	internalGetAll,
	internalUpdate,
	internalCreate,
	internalDelete,
}

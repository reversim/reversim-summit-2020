DBQuery.shellBatchSize = 1000;
db.proposals.aggregate([
	{ $match: { status: 'accepted' } },
	{ $unwind: "$speaker_ids"},
	{ $lookup: {
			localField: "speaker_ids",
			from: "users",
			foreignField: "_id",
			as: "speaker"
	}},
	{ $unwind: "$speaker"},
	{ $project: {
		"_id": 0,
		"speaker.profile.picture": 1,
		"speaker.profile.name": 1
	}},
	{ $group: {
		_id: "$speaker.profile.name",
		picture: { $first: "$speaker.profile.picture" }
	}}
]);
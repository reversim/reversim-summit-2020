db.proposals_votes.remove({});
db.proposals.aggregate(
  {$project: {
    _id: "$_id",
    votes: {$size: "$attendees"}
  }
  }
  ,{$out: "proposals_votes"}
);

db.proposals_votes.find().forEach(function(p){
  print(p._id.str, ", ", p.votes);
});

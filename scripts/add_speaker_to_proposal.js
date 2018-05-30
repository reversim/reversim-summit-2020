(function({proposalId, userId}){
  print("Adding user ", userId, "(", db.users.findOne(userId).name, ") to proposal ", proposalId, "(", db.proposals.findOne(proposalId).title, ")");
  db.users.update({
    _id: ObjectId(userId)
  }, {
    $push: {
      proposals: ObjectId(proposalId)
    }
  });
  db.proposals.update({
    _id: ObjectId(proposalId)
  }, {
    $push: {
      speaker_ids: ObjectId(userId)
    }
  });
})({proposalId: "xxxxx-proposal-id-xxxxxxxxxxxxxx", userId: "xxxxxxxx-user-id-xxxxxxxxxxxxxxxxx"})

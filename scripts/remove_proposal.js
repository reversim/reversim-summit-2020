// Use this function in mongo console to remove a proposal by ID

(function(proposalId){
  print("Removing proposal: ", proposalId, db.proposals.findOne(proposalId).title);
  db.users.update({
  }, {
    $pull: {
      proposals: ObjectId(proposalId)
    }
  }, {
    multi: true
  });
  db.proposals.remove(proposalId);
})("xxxxxxxxxxxxxxxxxxxxxx-insert-proposal-id-here-xxxxxxxxxxxxxxxxxxxxxxxxxxx")

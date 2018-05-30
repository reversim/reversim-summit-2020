// Use this function in mongo console to remove a proposal by ID

function removeProposal(proposalId) {
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
  print("DONE");
}

removeProposal("xxxxxxxxxxxxxxxxxxxxxx-insert-proposal-id-here-xxxxxxxxxxxxxxxxxxxxxxxxxxx")

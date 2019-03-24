db.proposals.aggregate({
    $project: {
      _id: "$_id",
      votes: {$size: "$attendees"}
    }
  }
).forEach(function(p){
  print(p._id.str, ", ", p.votes);
});

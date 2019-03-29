db.proposals.aggregate([
  {
    $match: {
      status: {
        $nin: ['archived', 'deleted']
      }
    }
  },
  {
    $project: {
      _id: "$_id",
      votes: {$size: "$attendees"}
    }
  }
]
).forEach(function(p){
  print(p._id.str, ", ", p.votes);
});

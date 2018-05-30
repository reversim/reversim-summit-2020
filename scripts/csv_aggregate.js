db.proposals_flat.remove({});
db.proposals.aggregate(
  {$project: {_id: 0, id: 1, title: 1, type: 1, tags: 1, speaker_ids: 1 }},
  {$unwind: "$speaker_ids"},
  {$lookup: {
    localField: "speaker_ids",
    from: "users",
    foreignField: "_id",
    as: "speaker"
  }},
  {$unwind: "$speaker"},
  {$project: {
    _id: 0,
    link: { $concat: ["https://summit2018.reversim.com/session/", "$id"]},
    title: 1,
    type: 1,
    tags: {
      $reduce: {
        input: "$tags",
        initialValue: "",
        in: {
          $cond: {
            "if": { $eq: [{ $indexOfArray: ["$tags", "$$this"] }, 0]},
            "then": { $concat: ["$$value", "$$this"] },
            "else": { $concat: ["$$value", ",", "$$this"] }
          }
        }
      }
    },
    categories: {
      $reduce: {
        input: "$categories",
        initialValue: "",
        in: {
          $cond: {
            "if": { $eq: [{ $indexOfArray: ["$categories", "$$this"] }, 0]},
            "then": { $concat: ["$$value", "$$this"] },
            "else": { $concat: ["$$value", ",", "$$this"] }
          }
        }
      }
    },
    speaker: "$speaker.name",
    email: "$speaker.email"
  }
  }
  ,{$out: "proposals_flat"}
);
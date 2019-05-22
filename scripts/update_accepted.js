db.proposals.update({
  _id: { $in: [
    ObjectId("5c78704d1503d900172c584b")
    ]
  }
}, {
  $set: { status: 'withdrawn' }
}, {
  multi: true
});


db.proposals.update({
  _id: { $in: [
    ObjectId("5c76d67f051b240017a20910"),
    ObjectId("5c50c2ddae9a470017867fc9"),
    ObjectId("5c6c23fcd7ca690017a9d042"),
    ObjectId("5c6f045cf9d89b0017a7d80b"),
    ObjectId("5c73f0a0fb50dd0017b460cb"),
    ObjectId("5c753a43d0e22f001706cbd1"),
    ObjectId("5c768ead2443a10017bb2bd1"),
    ObjectId("5c7817eb9cec66001786e69c"),
    ObjectId("5c7854181503d900172c5833"),
    ObjectId("5c4ec71ae6319f00172a968e"),
    ObjectId("5c518d9f7314030017e1c2c7"),
    ObjectId("5c66b0052be200001726d346"),
    ObjectId("5c6a6e55d330b60017b4f82f"),
    ObjectId("5c6beb0ad7ca690017a9d038"),
    ObjectId("5c754052d0e22f001706cbd8"),
    ObjectId("5c75adf7e037850017ca38cd"),
    ObjectId("5c77fd129cec66001786e678"),
    ObjectId("5c781b369cec66001786e6a1"),
    ObjectId("5c7859c31503d900172c5840"),
    ObjectId("5c5145067314030017e1c2b5"),
    ObjectId("5c52f3c55a09c900174932e3"),
    ObjectId("5c57eb47499ec8001717bb1b"),
    ObjectId("5c5eae53ced7850017d57f40"),
    ObjectId("5c5fe555e6ceb50017772487"),
    ObjectId("5c6da466a0b22e0017b88ac5"),
    ObjectId("5c751107d0e22f001706cbc5"),
    ObjectId("5c778acb9cec66001786e608"),
    ObjectId("5c7801589cec66001786e680"),
    ObjectId("5c7859231503d900172c583e"),
    ObjectId("5c6407d2e2ba3d00178ee60c"),
    ObjectId("5c7557e2d0e22f001706cbe0"),
    ObjectId("5c77de369cec66001786e64b"),
    ObjectId("5c77f95a9cec66001786e671"),
    ObjectId("5c741556fb50dd0017b460d2"),
    ObjectId("5c74d43efb50dd0017b460e2"),
    ObjectId("5c76534de037850017ca38f0"),
    ObjectId("5c765e02e037850017ca38f6"),
    ObjectId("5c76650be037850017ca38f8"),
    ObjectId("5c768578b347af001757ff25"),
    ObjectId("5c77c9ab9cec66001786e633"),
    ObjectId("5c501187ae9a470017867fb4"),
    ObjectId("5c5eafa3ced7850017d57f41"),
    ObjectId("5c6e9189f9d89b0017a7d7fc"),
    ObjectId("5c741121fb50dd0017b460d1"),
    ObjectId("5c744342fb50dd0017b460d6"),
    ObjectId("5c767e73b347af001757ff22"),
    ObjectId("5c7795039cec66001786e60f"),
    ObjectId("5c77c6089cec66001786e62e"),
    ObjectId("5c77ee889cec66001786e666"),
    ObjectId("5c77ff989cec66001786e67b"),
    ObjectId("5c7811269cec66001786e697"),
    ObjectId("5c783ea0d1b4260017fe23f1"),
    ObjectId("5c7847ea1503d900172c581f"),
    ObjectId("5c517d367314030017e1c2c4"),
    ObjectId("5c645d5ae2ba3d00178ee616"),
    ObjectId("5c77ae2c9cec66001786e61e"),
    ObjectId("5c4f84abae9a470017867fae"),
    ObjectId("5c765936e037850017ca38f3"),
    ObjectId("5c7693c3051b240017a208f2"),
    ObjectId("5c784cce1503d900172c582a"),
    ObjectId("5c650165ceec950017a7a213"),
    ObjectId("5c685885f477e10017131ac1"),
    ObjectId("5c77f6d79cec66001786e670"),
    ObjectId("5c648683ceec950017a7a20d"),
    ObjectId("5c6c2441d7ca690017a9d043"),
    ObjectId("5c6c657d8e68c600174f5109"),
    ObjectId("5c77b5af9cec66001786e626"),
    ObjectId("5c64a069ceec950017a7a211"),
    ObjectId("5c768d4eb347af001757ff29"),
    ObjectId("5c771e7d9cec66001786e604"),
    ObjectId("5c507db4ae9a470017867fc1"),
    ObjectId("5c51f4e27314030017e1c2ce"),
    ObjectId("5c72fecbe931df0017cad291")
    ]
  }
}, {
  $set: { status: 'accepted' }
}, {
  multi: true
});

db.proposals.update({
  status: "proposed"
}, {
  $set: { status: 'rejected' }
}, {
  multi: true
});

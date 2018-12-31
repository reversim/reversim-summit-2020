import moment from 'moment-timezone';

const config = {
  // TODO neta- set true date
  cfpStartDate: process.env.CFP_START_DATE ||  "2019-1-20",
  cfpEndDate: process.env.CFP_END_DATE || "2019-02-20",
  votingStartDate: process.env.VOTING_START_DATE || "2019-04-01",
  votingEndDate: process.env.VOTING_END_DATE || "2019-05-01",
}

export default () => {
  const cfp = moment().tz('Israel').isBetween(config.cfpStartDate, config.cfpEndDate, 'day', "[]");
  const voting = moment().tz('Israel').isBetween(config.votingStartDate, config.votingEndDate, 'day', "[]");
  const votingEnded = moment().tz('Israel').isAfter(config.votingEndDate, 'day', "[]");

  return {
    cfpStartDate: config.cfpStartDate,
    cfpEndDate: config.cfpEndDate,
    votingStartDate: config.votingStartDate,
    votingEndDate: config.votingEndDate,
    cfp,
    voting,
    votingEnded,
  }
}

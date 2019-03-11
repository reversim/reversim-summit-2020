import moment from 'moment-timezone';
import moment2 from 'moment';
const config = {
  cfpStartDate: process.env.CFP_START_DATE ||  "2019-01-20",
  cfpEndDate: process.env.CFP_END_DATE || "2019-02-28",
  votingStartDate: process.env.VOTING_START_DATE || "2019-03-12",
  votingEndDate: process.env.VOTING_END_DATE || "2019-04-01",
}

export default () => {
  const cfp = moment().tz('Israel').subtract(8, 'hours').isBetween(config.cfpStartDate, config.cfpEndDate, 'day', "[]");
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
    votingCountDown: (moment2(config.votingEndDate).diff(moment()) / 1000)
  }
}

import moment from 'moment-timezone';
import moment2 from 'moment';
const config = {
  cfpStartDate: process.env.CFP_START_DATE ||  "2020-05-01",
  cfpEndDate: process.env.CFP_END_DATE || "2020-06-01",
  votingStartDate: process.env.VOTING_START_DATE || "2020-06-14",
  votingEndDate: process.env.VOTING_END_DATE || "2020-06-31",
  summitStartDate: process.env.SUMMIT_START_DATE || "2020-10-14",
}

export default () => {
  const cfp = moment().tz('Israel').subtract(8, 'hours').isBetween(config.cfpStartDate, config.cfpEndDate, 'day', "[]");
  const voting = moment().tz('Israel').subtract(15, 'hours').isBetween(config.votingStartDate, config.votingEndDate, 'hour', "[]");
  const votingEnded = moment().tz('Israel').subtract(15, 'hours').isAfter(config.votingEndDate, 'day', "[]");
  const votingCountDown = (moment2(config.votingEndDate).tz('Israel').add(15, 'hours').diff(moment()) / 1000);
  const summitStartCountDown = (moment2(config.summitStartDate).tz('Israel').add(9, 'hours').diff(moment()) / 1000);
  const moderationCompleted = (process.env.MODERATION_COMPLETED === 'true');

  return {
    cfpStartDate: config.cfpStartDate,
    cfpEndDate: config.cfpEndDate,
    votingStartDate: config.votingStartDate,
    votingEndDate: config.votingEndDate,
    cfp,
    voting,
    votingEnded,
    votingCountDown,
    summitStartCountDown,
    moderationCompleted,
    agendaPublished: false, // TODO: use env var
    registrationOpen: false, // TODO: use env var
  }
}

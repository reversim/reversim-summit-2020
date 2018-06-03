import moment from 'moment-timezone';

const config = {
  cfpStateDate: "2018-04-25",
  cfpEndDate: "2018-05-31",
  votingStartDate: "2018-06-01",
  votingEndDate: "2018-06-10",
}

const cfp = moment().tz('Israel').isBetween(config.cfpStateDate, config.cfpEndDate, 'day', "[]");
const voting = moment().tz('Israel').isBetween(config.votingStartDate, config.votingEndDate, 'day', "[]");

export default {
  cfpStateDate: config.cfpStateDate,
  cfpEndDate: config.cfpEndDate,
  votingStartDate: config.votingStartDate,
  votingEndDate: config.votingEndDate,
  cfp,
  voting,
}
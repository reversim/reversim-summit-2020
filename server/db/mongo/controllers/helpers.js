import topics from './topics';
import users from './users';
import proposals from './proposals';
import _ from 'lodash';

export function transformUser(user) {
  if (user._doc) {
    user = user._doc;
  }

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(transformProposal),
      name: user.profile && user.profile.name,
      oneLiner: user.profile && user.profile.oneLiner,
      email: user.email,
      isReversimTeamMember: user.isReversimTeamMember,
      bio: user.profile && user.profile.bio,
      gender: user.profile && user.profile.gender,
      picture: user.profile && user.profile.picture,
      linkedin: user.profile && user.profile.linkedin,
      twitter: user.profile && user.profile.twitter,
      stackOverflow: user.profile && user.profile.stackOverflow
    };
  }

  return user;
}

export function transformProposal(proposal, session) {
  if (_.isObject(proposal)) {
    return {
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      speaker_ids: proposal.speaker_ids && proposal.speaker_ids.map(transformUser),
      attended: session && proposal.attendees && session.passport && session.passport.user ? _.includes(proposal.attendees.map(a => a.toHexString()), session.passport.user) : false
    }
  }

  return proposal;
}

export default {
  transformUser,
  transformProposal
};

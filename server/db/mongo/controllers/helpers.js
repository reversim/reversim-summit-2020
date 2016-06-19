import topics from './topics';
import users from './users';
import proposals from './proposals';
import _ from 'lodash';

export function transformUser(user, emailAllowed) {
  if (user._doc) {
    user = user._doc;
  }

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(transformProposal),
      name: user.profile && user.profile.name,
      oneLiner: user.profile && user.profile.oneLiner,
      email: emailAllowed && user.email,
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

export function transformProposal(proposal, loggedInUser) {
  if (_.isObject(proposal)) {
    return {
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      speaker_ids: proposal.speaker_ids && proposal.speaker_ids.map((user) => {
        let emailAllowed = loggedInUser && loggedInUser.isReversimTeamMember;
        return transformUser(user, emailAllowed);
      }),
      attended: proposal.attendees && loggedInUser ? _.includes(proposal.attendees.map(a => a.toHexString()), loggedInUser) : false
    }
  }

  return proposal;
}

export default {
  transformUser,
  transformProposal
};

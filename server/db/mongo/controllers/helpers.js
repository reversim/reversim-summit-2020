import topics from './topics';
import users from './users';
import proposals from './proposals';
import _ from 'lodash';

export function transformUser(user, isReversimMember) {
  if (user._doc) {
    user = user._doc;
  }

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(transformProposal),
      name: user.profile && user.profile.name,
      oneLiner: user.profile && user.profile.oneLiner,
      email: isReversimMember && user.email,
      trackRecord: isReversimMember && user.profile.trackRecord,
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

export function transformProposal(proposal, loggedInUser, overrideDetails) {

  if (_.isObject(proposal)) {
    return {
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      tags: proposal.tags,
      speaker_ids: proposal.speaker_ids && proposal.speaker_ids.map((user) => {
        let isReversimMember = overrideDetails || (loggedInUser && loggedInUser.isReversimTeamMember);
        return transformUser(user, isReversimMember);
      }),
      attended: proposal.attendees && (loggedInUser ? proposal.attendees.indexOf(loggedInUser._id) > -1 : false)
    }
  }

  return proposal;
}

export default {
  transformUser,
  transformProposal
};

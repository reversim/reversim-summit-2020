import topics from './topics';
import users from './users';
import proposals from './proposals';
import _ from 'lodash';

function isReversimTeamMember(loggedInUser) {
  return loggedInUser && loggedInUser.isReversimTeamMember;
}

export function transformUser(user, loggedInUser) {
  if (user._doc) {
    user = user._doc;
  }

  let isReversimMember = isReversimTeamMember(loggedInUser);

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(p => transformProposal(p, loggedInUser)),
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
      stackOverflow: user.profile && user.profile.stackOverflow,
      github: user.profile && user.profile.github,
      phone: isReversimMember && user.profile && user.profile.phone
    };
  }

  return user;
}

export function transformProposal(proposal, loggedInUser) {

  if (_.isObject(proposal)) {
    let isReversimMember = isReversimTeamMember(loggedInUser);

    return {
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      tags: proposal.tags,
      status: isReversimMember && proposal.status,
      speaker_ids: proposal.speaker_ids && proposal.speaker_ids.map((user) => {
        return transformUser(user, loggedInUser);
      }),
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      hall: proposal.hall,
      slides_gdrive_id: proposal.slides_gdrive_id,
      video_url: isReversimMember && proposal.video_url,
      outline: isReversimMember && proposal.outline,
      total: (proposal.attendees && isReversimMember) ? proposal.attendees.length : undefined,
      attended: proposal.attendees && (loggedInUser ? proposal.attendees.indexOf(loggedInUser._id) > -1 : false)
    }
  }

  return proposal;
}

export default {
  transformUser,
  transformProposal
};

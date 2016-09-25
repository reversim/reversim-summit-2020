import topics from './topics';
import users from './users';
import proposals from './proposals';
import _ from 'lodash';

function isReversimTeamMember(loggedInUser) {
  return loggedInUser && loggedInUser.isReversimTeamMember;
}

export function transformUser(user, loggedInUser, overrideDetails) {
  if (user._doc) {
    user = user._doc;
  }

  let isReversimMember = overrideDetails || isReversimTeamMember(loggedInUser);

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(p => transformProposal(p, loggedInUser, overrideDetails)),
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
    let isReversimMember = overrideDetails || isReversimTeamMember(loggedInUser);

    return {
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      tags: proposal.tags,
      status: proposal.status,
      speaker_ids: proposal.speaker_ids && proposal.speaker_ids.map((user) => {
        return transformUser(user, loggedInUser, overrideDetails);
      }),
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      hall: proposal.hall,
      slides_gdrive_id: proposal.slides_gdrive_id,
      video_url: proposal.video_url,
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

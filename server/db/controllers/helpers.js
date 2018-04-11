import _ from 'lodash';

function isReversimTeamMember(loggedInUser) {
  return loggedInUser && loggedInUser.isReversimTeamMember;
}

export function transformUser(user, loggedInUser) {
  if (user._doc) {
    user = user._doc;
  }

  const isTeamMember = isReversimTeamMember(loggedInUser);
  const isLoggedInUser = loggedInUser && (String(loggedInUser._id) === String(user._id));
  const canViewPrivate = isTeamMember || isLoggedInUser;

  if (_.isObject(user) && _.has(user, 'profile')) {
    return {
      _id: user._id,
      proposals: user.proposals && user.proposals.map(p => String(p)),
      name: user.profile && user.profile.name,
      oneLiner: user.profile && user.profile.oneLiner,
      email: canViewPrivate && user.email,
      trackRecord: canViewPrivate && user.profile.trackRecord,
      isReversimTeamMember: user.isReversimTeamMember,
      bio: user.profile && user.profile.bio,
      gender: user.profile && user.profile.gender,
      picture: user.profile && user.profile.picture.replace("/dtltonc5g/image/upload/", "/dtltonc5g/image/upload/w_300/"),
      linkedin: user.profile && user.profile.linkedin,
      twitter: user.profile && user.profile.twitter,
      stackOverflow: user.profile && user.profile.stackOverflow,
      github: user.profile && user.profile.github,
      phone: canViewPrivate && user.profile && user.profile.phone
    };
  }

  return user;
}

export function transformProposal(proposal, loggedInUser) {

  if (_.isObject(proposal)) {
    const isTeamMember = isReversimTeamMember(loggedInUser);
    const isAuthor =  loggedInUser && proposal.speaker_ids && proposal.speaker_ids.some(speaker => String(speaker._id) === String(loggedInUser._id));
    const canViewPrivate = isTeamMember || isAuthor;

    // console.log("transformProposal, proposal=" + proposal.id, "loggedInUser=", loggedInUser && loggedInUser._id, "isAuthor=", isAuthor, "isTeamMember=", isTeamMember);

    return {
      _id: String(proposal._id),
      id: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      tags: proposal.tags,
      status: canViewPrivate ? proposal.status : undefined,
      speaker_ids: proposal.speaker_ids ? proposal.speaker_ids.map((user) => {
        return transformUser(user, loggedInUser);
      }) : undefined,
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      hall: proposal.hall,
      slides_gdrive_id: proposal.slides_gdrive_id,
      video_url: canViewPrivate ? proposal.video_url : undefined,
      outline: canViewPrivate ? proposal.outline : undefined,
      total: (proposal.attendees && canViewPrivate) ? proposal.attendees.length : undefined,
      attended: proposal.attendees ? (loggedInUser ? proposal.attendees.indexOf(loggedInUser._id) > -1 : false) : undefined
    }
  }

  return proposal;
}

export default {
  transformUser,
  transformProposal
};

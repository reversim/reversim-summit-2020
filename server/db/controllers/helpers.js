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

  if (_.isObject(user)) {
    return {
      _id: String(user._id),
      proposals: user.proposals && user.proposals.map(p => String(p)),
      name: user.name,
      oneLiner: user.oneLiner,
      email: canViewPrivate && user.email,
      trackRecord: canViewPrivate && user.trackRecord,
      isReversimTeamMember: user.isReversimTeamMember,
      bio: user.bio,
      gender: user.gender,
      picture: user.picture && user.picture.replace("/dtltonc5g/image/upload/", "/dtltonc5g/image/upload/w_300/"),
      linkedin: user.linkedin,
      twitter: user.twitter,
      stackOverflow: user.stackOverflow,
      github: user.github,
      phone: canViewPrivate && user.phone,
      video_url: canViewPrivate ? user.video_url : undefined,
    };
  }

  return user;
}

export function transformProposal(proposal, loggedInUser) {

  if (_.isObject(proposal)) {
    const isTeamMember = isReversimTeamMember(loggedInUser);
    const isAuthor =  loggedInUser && proposal.speaker_ids && proposal.speaker_ids.some(speakerId => String(speakerId) === String(loggedInUser._id));
    const canViewPrivate = isTeamMember || isAuthor;

    // console.log("transformProposal, proposal=" + proposal.id, "loggedInUser=", loggedInUser && loggedInUser._id, "isAuthor=", isAuthor, "isTeamMember=", isTeamMember);

    return {
      _id: String(proposal._id),
      title: proposal.title,
      abstract: proposal.abstract,
      type: proposal.type,
      tags: proposal.tags,
      status: canViewPrivate ? proposal.status : undefined,
      speaker_ids: proposal.speaker_ids,
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      hall: proposal.hall,
      slides_gdrive_id: proposal.slides_gdrive_id,
      categories: canViewPrivate ? proposal.categories : undefined,
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

import React from 'react';
import Redirect from './Redirect';
import {SpeakerPage} from './SpeakerPage';

const MyProfile = Redirect(({user, ...props}) => (
  <SpeakerPage speaker={user} isUser={true} user={user} {...props} />
));

export default MyProfile;

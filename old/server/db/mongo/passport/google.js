import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ google: profile.id }).exec((findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken });
        user.profile.name = user.profile.displayName || profile._json.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = (profile.photos[0].value || profile._json.image.url).replace(/\?sz=\d+/,"");
        user.created_at = new Date();
        user.save((err) => {
          done(err, user, { message: 'Google account has been linked.' });
        });
      });
    });
  }

  return User.findOne({ google: profile.id }).exec((findByGoogleIdErr, existingUser) => {
    if (existingUser) {
      // TODO: update user info
      return done(null, existingUser);
    }

    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
      }
      const user = new User();
      user.email = profile.emails[0].value || profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken });
      user.profile.name = profile.displayName || profile._json.displayName;
      user.profile.gender = user.profile.gender || profile._json.gender;
      user.profile.picture = (profile.photos[0].value || profile._json.image.url).replace(/\?sz=\d+/,"");
      user.created_at = new Date();
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */

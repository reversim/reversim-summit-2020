/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '435647457161-dkgkkh7ma6cuomkseeuc3rnmr8qbaqo3.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'j4y2GQqNT0jGsO8m07ZNs7WO',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export default {
  sessionSecret,
  google
};

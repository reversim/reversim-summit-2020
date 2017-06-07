/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
let pass = {};
try {
  pass = require('../../.private/pass');
} catch(ex) {
  console.log("Couldn't find local pass file. Relying on env");
}

export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: pass.GOOGLE_CLIENTID || process.env.GOOGLE_CLIENTID,
  clientSecret: pass.GOOGLE_SECRET || process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};
export const twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

export default {
  sessionSecret,
  google,
  twitter
};

/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '435647457161-dkgkkh7ma6cuomkseeuc3rnmr8qbaqo3.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'j4y2GQqNT0jGsO8m07ZNs7WO',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};
export const twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY || 'wOgi4xZscVuT1f1NNSMkE6Lf2',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'OPpj3aINebr69YeOnrCCnhe2ameurGfhG5d878LpZIB9JWWFRu',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '68001994-RAnNfD0hh01bjwqQfBWeo2sjRz9kE5pzeyXzmE72o',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'K4jHN89K451r7xigHWIvd9GKSo39pSS8ZyBeDHxJLYChT'
};

export default {
  sessionSecret,
  google,
  twitter
};

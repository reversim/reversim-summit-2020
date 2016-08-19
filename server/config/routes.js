/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import tweetsController from './tweetsController';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const proposalsController = controllers && controllers.proposals;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.post('/updateUser', usersController.update);
    app.get('/user/proposals', usersController.getProposals);
    app.get('/api/team', usersController.getReversimTeam);
    app.post('/profileImage', usersController.uploadProfilePicture);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  // twitter feed
  if (tweetsController) {
    app.get('/tweets/reversim', tweetsController.reversimUserFeed);
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', function(req, res, next) {
      req.session.returnTo = req.query.returnTo;
      next();
    }, passport.authenticate('google', {
      scope: [
        'profile',
        'email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
        function(req, res, next) {
          console.log('Request URL:', req.originalUrl);
          next();
        },
      passport.authenticate('google'), function(req, res) {
        if (req.session.returnTo) {
          console.log('redirecting to '+req.session.returnTo);
          res.redirect(`${req.session.returnTo}`);
          delete req.session.returnTo;
        } else {
          res.redirect('/');
        }
      }
    );
  }

  // proposal routes
  if (proposalsController) {
    app.get('/proposal', proposalsController.all);
    app.get('/proposal/:id/recommendations', proposalsController.getRecommendations);
    app.get('/proposal/tags', proposalsController.tags);
    app.get('/proposal/:id', proposalsController.get);
    app.post('/proposal/:id', proposalsController.add);
    app.put('/proposal/:id', proposalsController.update);
    app.delete('/proposal/:id', proposalsController.remove);
    app.post('/proposal/:id/attend', proposalsController.attend);
    app.get('/api/speakers', proposalsController.speakers);
  } else {
    console.warn(unsupportedMessage('proposalsController routes'));
  }
};

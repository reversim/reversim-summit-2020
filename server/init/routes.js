/**
 * Routes for express app
 */
import express from 'express';
import path from 'path';
import passport from 'passport';
import { controllers } from '../db';

const usersController = controllers.users;
const proposalsController = controllers.proposals;

export default (app) => {
  // user routes
  app.post('/login', usersController.login);
  app.post('/signup', usersController.signUp);
  app.post('/logout', usersController.logout);
  app.post('/updateUser', usersController.update);
  app.get('/user/proposals', usersController.getProposals);
  app.get('/api/team', usersController.getReversimTeam);
  app.post('/profileImage', usersController.uploadProfilePicture);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
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

  // proposal routes
  app.get('/proposal', proposalsController.all);
  app.get('/proposal/:id/recommendations', proposalsController.getRecommendations);
  app.get('/proposal/tags', proposalsController.tags);
  app.get('/proposal/:id', proposalsController.get);
  app.post('/proposal/:id', proposalsController.add);
  app.put('/proposal/:id', proposalsController.update);
  app.delete('/proposal/:id', proposalsController.remove);
  app.post('/proposal/:id/attend', proposalsController.attend);
  app.get('/api/speakers', proposalsController.speakers);
  app.get('/api/proposal/attendees', proposalsController.getAllAttendees);

  app.use("/dashboard", express.static(path.join(__dirname, '..', '..', 'app', 'dashboard', 'index.html')));
};
/**
 * Routes for express app
 */
import express from 'express';
import path from 'path';
import passport from 'passport';

import keyBy from 'lodash/keyBy';
import { controllers } from '../db';
import { transformProposal, transformUser } from '../db/controllers/helpers';
import eventConfig from './eventConfig';

const usersController = controllers.users;
const proposalsController = controllers.proposals;
const messagesController = controllers.messages;
const sponsorsController = controllers.sponsors;

export default (app) => {
  // user routes
  app.post('/login', usersController.login);
  app.post('/signup', usersController.signUp);
  app.post('/api/logout', usersController.logout);
  app.put('/api/user', usersController.update);
  app.get('/user/proposals', usersController.getProposals);
  app.get('/api/team', usersController.getReversimTeam);
  app.post('/api/profileImage', usersController.uploadProfilePicture);
  app.get('/api/me', usersController.me);
  app.put('/api/team', usersController.registerTeamMember);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/callback
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', function(req, res, next) {
    req.session.returnTo = req.query.returnTo;
    next();
    }, passport.authenticate('google', { scope: ['profile', 'email'] }));

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

  async function initial(req, res) {
    const proposals = await proposalsController.getAllProposals(true, req.user ? req.user.created_at : String(Date.now()));
    const acceptedProposals = await proposalsController.getAcceptedProposals(true, req.user ? req.user.created_at : String(Date.now()));
    const users = await proposalsController.getProposers(proposals);
    const acceptedSpeakers = (await proposalsController.getProposers(acceptedProposals)).map(u => u._id);
    const allTags = proposalsController.getTags(proposals);
    const user = req.user;
    const teamUsers = await usersController.getTeam();
    const messages = await messagesController.getAllMessages();
    const sponsors = await sponsorsController.getAllSponsors(true);
    const speakers = users.map(u => u._id);
    const team = teamUsers.map(u => u._id);

    const userId = user && String(user._id);
    if (userId && !users.find(u => String(u._id) === userId)) users.unshift(user);

    const usersWithTeam = users.concat(teamUsers);

    const mappedProposals = proposals.map(proposal => transformProposal(proposal, req.user));
    const mappedAcceptedProposals = acceptedProposals.map(proposal => transformProposal(proposal, req.user));
    let mappedUsers = usersWithTeam.map(u => transformUser(u, req.user));

    res.json({
      proposals: keyBy(mappedProposals, '_id'),
      users: keyBy(mappedUsers, '_id'),
      user: user ? user._id : null,
      allTags,
      team,
      messages,
      sponsors,
      eventConfig: eventConfig(),
      speakers,
      acceptedProposals:keyBy(mappedAcceptedProposals, '_id'),
      acceptedSpeakers
    });
  }

  // proposal routes
  app.get('/api/initial', initial);
  app.get('/api/sessions', proposalsController.sessions);
  app.get('/api/proposals', proposalsController.getAll);
  app.get('/api/proposal/tags', proposalsController.tags);
  app.get('/api/proposal/:id', proposalsController.get);
  app.post('/api/proposal', proposalsController.add);
  app.put('/api/proposal/:id', proposalsController.update);
  app.delete('/api/proposal/:id', proposalsController.remove);
  app.post('/api/proposal/:id/attend', proposalsController.attend);
  app.get('/api/speakers', proposalsController.getSpeakers);
  app.get('/api/proposers', proposalsController.proposers);
  app.get('/api/proposals/attendees', proposalsController.getAllAttendees);

  app.get('/api/messages', messagesController.getMessages);
  app.post('/api/message', messagesController.addMessage);
  app.delete('/api/message/:id', messagesController.removeMessage);

  app.get('/api/sponsors', sponsorsController.all);
  app.post('/api/sponsor', sponsorsController.add);
  app.put('/api/sponsor/:id', sponsorsController.update);
  app.delete('/api/sponsor/:id', sponsorsController.remove);

  app.use('/dashboard', express.static(path.join(__dirname, '..', '..', 'app', 'dashboard', 'index.html')));
  
  // internal routes
  app.use('/internal*', (req, res, next) => {
    // If user is not a team member he won't have access
    if (!req.user || !req.user.isDataAdmin) {
      return res.send(401);
    }
    
    next();
  });
  
  app.use('/internal/backoffice', express.static(path.resolve(__dirname, '..', '..', 'backoffice')));
  app.use('/internal/backoffice', express.static(path.join(__dirname, '..', '..', 'backoffice', 'index.html')));

  app.get('/internal/users', usersController.internalGetAll);
  app.put('/internal/users/:_id', usersController.internalUpdate);
  app.post('/internal/users', usersController.internalCreate);
  app.delete('/internal/users/:_id', usersController.internalDelete);

  app.get('/internal/proposals', proposalsController.internalGetAll);
  app.put('/internal/proposals/:_id', proposalsController.internalUpdate);
  app.post('/internal/proposals', proposalsController.internalCreate);
  app.delete('/internal/proposals/:_id', proposalsController.internalDelete);

  app.get('/internal/sponsors', sponsorsController.internalGetAll);
  app.post('/internal/sponsors', sponsorsController.internalCreate);
  app.put('/internal/sponsors/:_id', sponsorsController.internalUpdate);
  app.delete('/internal/sponsors/:_id', sponsorsController.internalDelete);

  app.get('/internal/messages', messagesController.internalGetAll);
  app.post('/internal/messages', messagesController.internalCreate);
  app.put('/internal/messages/:_id', messagesController.internalUpdate);
  app.delete('/internal/messages/:_id', messagesController.internalDelete);
};

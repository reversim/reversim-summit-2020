import User from '../models/user';
import passport from 'passport';
import {transformUser, transformProposal} from './helpers';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  });
}

/**
 * Update a user
 */
export function update(req, res) {
  const omitKeys = ['id', '_id', '_v', 'google'];
  const data = _.omit(req.body, omitKeys);

  User.findOneAndUpdate({ '_id': req.session.passport.user }, data, (err, user) => {
    if (err) {
      console.log(`Error in users/update query: ${err}`);
      return res.status(500).send('Something went wrong');
    }

    console.log('Updated successfully');

    return res.status(200).send('Updated successfully');
  });
}

export function getReversimTeam(req, res) {
    //console.log('proposal all started...');
    User.find({ isReversimTeamMember: true }).exec((err, users) => {
        if (err) {
          console.log(`Error in users/getReversimTeam query: ${err}`);
          return res.status(500).send('Something went wrong');
        }

        return res.json(users.map(transformUser));
    });
}

/**
 * Proposals for User
 */
export function getProposals(req, res) {
    //console.log('proposal all started...');

    if (req.session.passport) {
      User.findOne({'_id': req.session.passport.user}).populate('proposals').exec((err, user) => {
          if (err) {
            console.log(`Error in users/getProposals query: ${err}`);
            return res.status(500).send('Something went wrong');
          }

          return res.json(user.proposals.map(transformProposal));
      });
    } else {
      console.log("----------------------------------------");
      console.log(req.session);
      console.log("----------------------------------------");

      return res.status(500).send('Something went wrong getting the data');
    }
}

export default {
  login,
  logout,
  update,
  signUp,
  getProposals,
  getReversimTeam
};

import User from '../models/user';
import passport from 'passport';
import {transformUser, transformProposal} from './helpers';
import _ from 'lodash';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dtltonc5g',
  api_key: '478363387677438',
  api_secret: 'ezLey1P-aVWlOhAv-cvJdRmcK-w'
});

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
  const omitKeys = ['id', '_id', '_v', 'google', 'teamMemberToken'];
  const data = _.omit(req.body, omitKeys);

  if (req.body.teamMemberToken === process.env.TEAM_MEMBER_TOKEN) {
    data.isReversimTeamMember = true;
  }

  console.log('update body is: '+JSON.stringify(data));

  User.findOneAndUpdate({ '_id': req.session.passport.user }, data, (err, user) => {
    if (err) {
      console.log(`Error in users/update query: ${err}`);
      console.error('stack: '+err.stack);
      return res.status(500).send('Something went wrong');
    }

    console.log('Updated successfully');

    return res.status(200).send('Updated successfully');
  });
}

export function uploadProfilePicture(req, res) {
  cloudinary.uploader.upload(req.body.imageBinary, function(result) {
    console.log('uploadProfilePicture started...');

    User.findOneAndUpdate({ '_id': req.body.id }, {'profile.picture': result.secure_url}, (err, user) => {
      if (err) {
        console.log(`Error in users/uploadProfilePicture query: ${err}`);
        console.error('stack: '+err.stack);
        return res.status(500).send('Something went wrong');
      }

      console.log('uploadProfilePicture successfully');

      return res.status(200).send({message: 'uploadProfilePicture success', imageUrl: result.secure_url});
    });
  });

}

const reversimTeam = [
  'Lidan Hifi',
  'Amit Zur',
  'Adam Matan',
  'Shlomi Hassan',
  'Ori Lahav',
  'Ran Tavory'
].map(x => x.toLowerCase());

export function getReversimTeam(req, res) {
  //console.log('proposal all started...');
  User.find({ isReversimTeamMember: true }).exec((err, users) => {
    if (err) {
      console.log(`Error in users/getReversimTeam query: ${err}`);
      console.error('stack: '+err.stack);
      return res.status(500).send('Something went wrong');
    }

    let ret = users
      .sort((a,b) => {
        return reversimTeam.indexOf(b.profile.name.toLowerCase()) - reversimTeam.indexOf(a.profile.name.toLowerCase());
      })
      .map(u => transformUser(u, req.user));
    return res.json(ret);
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

      return res.json(user.proposals.map(p => transformProposal(p, req.user)));
    });
  } else {
    return res.status(500).send('Something went wrong getting the data');
  }
}

export default {
  login,
  logout,
  update,
  signUp,
  getProposals,
  getReversimTeam,
  uploadProfilePicture
};

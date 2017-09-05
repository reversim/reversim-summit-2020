import User from '../models/user';

export default (id, done) => {
  User.findById(id).populate('proposals').exec((err, user) => {
    done(err, user);
  });
};

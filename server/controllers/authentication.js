const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config.js');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

module.exports.signup = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }


  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use'})
      }

      const user = new User({
        email,
        password
      });

      user.save()
        .then(user => {
          res.json({ token: tokenForUser(user)})
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))

}

module.exports.signin = (req, res, next) => {

  res.send({ token: tokenForUser(req.user)})
}
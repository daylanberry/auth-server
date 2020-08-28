const User = require('../models/user')

module.exports.signup = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }


  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send( { error: 'Email is in user'})
      }

      const user = new User({
        email,
        password
      });

      user.save()
        .then(user => {
          res.json(user)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))

}
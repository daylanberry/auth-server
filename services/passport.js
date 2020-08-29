const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(function(username, password, done) {
  User.findOne()
})



const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      donee(null, false)
    }
  })
});

passport.use(jwtLogin)
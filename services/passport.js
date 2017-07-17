import passport from 'passport'
import User from '../models/user'
import config from '../config'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import LocalStrategy from 'passport-local'

// Create local Strategy options
const localOptions = {
  usernameField: 'email'
}

// Create local Strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify email and password are correct
  // call done with user if correct
  // otherwise call done with false
  User.findOne({ email }, (err, user) => {
    if (err) return done(err, false)
    if (!user) return done(null, false)

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err, false)
      if (!isMatch) return done(null, false)

      return done(null, user)
    })
  })
})

// Create jwt Strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false)

    // See if the user ID in the payload exists
    if (user) {
      // If it does, call done with that user
      done(null, user)
    } else {
      // If it does not, call done without a user object
      done(null, false)
    }
  })
})

// Tell passport to use the Strategy
passport.use(localLogin)
passport.use(jwtLogin)

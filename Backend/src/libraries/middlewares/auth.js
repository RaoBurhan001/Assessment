const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
require('dotenv').config()
const userService = require('../../User/domain/service/userService')
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extracting the token from the headers request
  secretOrKey: process.env.JWT_SECRET
}

const jwtVerify = async (payload, done) => {
  try {
    const user = await userService.getUserFromToken(payload)
    if (user) {
      return done(null, user) // no error and we have the user
    } else {
      return done(null, false) // no error and we dont have the user
    }
  } catch (error) {
    return done(error, false) // error and dont have the user
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

// Use the JWT strategy with Passport
passport.use('jwt', jwtStrategy)

module.exports = {
  authenticateJWT: passport.authenticate('jwt', { session: false })
}

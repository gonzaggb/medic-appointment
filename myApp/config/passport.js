const LocalStrategy = require('passport-local').Strategy
const authenticateUser = require('../middlewares/authenticateUser')
const { getUserById } = require('../helpers/utilities')


function initiliaze(passport) {
    passport.use(new LocalStrategy({ usernameField: 'dni' },
        authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser(async (id, done) => { 
        return done(null, await getUserById(id)) })

}
module.exports = initiliaze
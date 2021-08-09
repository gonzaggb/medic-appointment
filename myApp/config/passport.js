const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../database/models')
const bcrypt = require('bcryptjs')


module.exports = function (passport, user) {
    passport.use('local', new LocalStrategy({
        usernameField: 'dni', //campo que viaja por el req.body que voy a evaluar con passport
        passwordField: 'password', //campo que viaja por el req.body que voy a evaluar con passport
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async function (req, dni, password, done) {
            const user = await User.findOne({ where: { dni } })
            if(user){
                return done(null, false, {
                    message: 'El'
                })
            }
        }

}

//serializa el usuario para quedarse unicamente con el ID para la cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    await User.findByPk(id, (err, user) => {
        done(err, user)
    })
})
console.log('ENTRE A PASSPORT')
{ usernameField: 'dni' },
async (dni, password, done) => {
    await User.findOne({ dni }, (err, user) => {
        if (!user) {
            return done(null, false, { message: "El mail o la contraseña son invalidos" })
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: "El mail o la contraseña son invalidos" })
            }
        }
        return done(null, usuario)
    })
}
))

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401)
}
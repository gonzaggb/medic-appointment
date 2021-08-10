const { getUserByDni } = require('../helpers/utilities')
const bcrypt = require('bcryptjs')

async function authenticaUser(dni, password, done) {
    const user = await getUserByDni(dni)
        if (!user) {
            return done(null, false, { type:'error', message: 'El mail o la contraseña son inválidos' })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { type:'error', message: 'El mail o la contraseña son inválidos' })
        }
        return done(null, user)
}

module.exports = authenticaUser
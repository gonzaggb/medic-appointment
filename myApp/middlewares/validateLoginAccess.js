const { body } = require('express-validator')
const { exist } = require('../helpers/utilities')
const bcrypt = require('bcryptjs')


const validations = [
    body('dni').notEmpty().withMessage('Debes escribir tu DNI').bail()
        .custom(async (val, { req }) => {
            const dni = req.body.dni
            user = await exist('dni', dni)
            const matchPass = bcrypt.compareSync(req.body.password, user.password)




            if (user && matchPass) {
                return true
            }
            return Promise.reject('El DNI o la contraseña son invalidos')
        }),
    body('password').notEmpty().withMessage('Debes escribir tu contraseña')
]


module.exports = validations
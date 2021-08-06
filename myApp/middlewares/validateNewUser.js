const { body } = require('express-validator')
const { exist } = require('../helpers/utilities')


const validations = [
    body('firstName').notEmpty().withMessage('Debes escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Debes escribir tu apellido'),
    body('dni').notEmpty().withMessage('Debes escribir tu DNI').bail()
    .isNumeric().withMessage('Debe ser numérico').bail()
    .custom(async (val, { req }) =>{
        const dni = req.body.dni
        if(await exist('dni',dni)){ //funcion que chequea si existe el dato en base a la columna
            return Promise.reject('El DNI ya está registrado')
        }
    }),

    body('phone').notEmpty().withMessage('Debes escribir tu número de teléfono'),
    body('email').notEmpty().withMessage('Debes escribir tu email').bail()
    .isEmail().withMessage('El ingresado no es un correo válido').bail()
    .custom(async (val, { req }) =>{
        const email = req.body.email
            if(await exist('email', email)){
            return Promise.reject('El correo ya está registrado')
        }
    }),

    body('password').notEmpty().withMessage('Debes escribir tu contraseña').bail()
    .custom( (val, { req }) =>{
        if(val == req.body.rePassword){
            return true
        }
        return false
    }).withMessage("Las contraseñas no coinciden"),

    body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña')
]


module.exports = validations
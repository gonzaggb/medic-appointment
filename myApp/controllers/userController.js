const { User } = require('../database/models')
const { validationResult } = require('express-validator')
const { UserAccess } = require('../database/models')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { locals } = require('../app')



const controller = {
    registry: (req, res) => {
        res.render('users/register.ejs')
    },

    create: async (req, res) => {
        const newUser = req.body
        const { password } = req.body
        const { patient } = req.body
        const formValidation = validationResult(req)
        const errors = formValidation.mapped()
        if (!formValidation.isEmpty()) {
            return res.render('users/register.ejs', { errors })
        }

        const newPass = bcrypt.hashSync(password, 10)
        newUser.password = newPass
        try {
            //crea el usuario en la tabla users
            const createdUser = await User.create(newUser)
            //si se marca el checkbox de paciente se crea la relacion con el rol en user_access
            if (patient) {
                const newUserAccess = {
                    userId: createdUser.id,
                    rolId: patient
                }
                await UserAccess.create(newUserAccess)

            }

        } catch (error) {
            console.log(error)

        }

        return res.redirect('/')
    },

    login: (req, res) => {
        res.render('users/login.ejs')
        
    },
    access: (req, res) => {
    }


}

module.exports = controller
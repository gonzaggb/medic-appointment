const { User } = require('../database/models')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')


const controller = {
    registry: (req, res) => {
        res.render('users/register.ejs')
    },

    create: async (req, res) => {
        const newUser = req.body
        const { password } = req.body
        const formValidation = validationResult(req)
        const errors = formValidation.mapped()
        if (!formValidation.isEmpty()) {
            return res.render('users/register.ejs', { errors })
        }

        const newPass = bcrypt.hashSync(password, 10)
        newUser.password = newPass
        try {
            await User.create(newUser)

        } catch (error) {
            console.log(error)

        }

        return res.redirect('/')
    },

    login: (req, res) => {
        res.render('users/login.ejs')
    },
    access: (req, res) => {
        const formValidation = validationResult(req)
        const errors = formValidation.mapped()
        res.send(errors)
    }

}

module.exports = controller
const { User } = require('../database/models')
const { validationResult } = require('express-validator')
const { UserAccess } = require('../database/models')
const bcrypt = require('bcryptjs')
const passport = require('passport')



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
    access: async (req, res, next) => {
        const formValidation = validationResult(req)
        const errors = formValidation.mapped()
        const { dni } = req.body
        console.log(passport.authenticate('local',(err,user,info)=>{
            console.log(user)
        }))
        console.log('voy a entrar a autenticate')
        passport.authenticate('local',(err,user,info)=>{
            console.log('-----------------------')
            console.log(info)
            if(err){
                next(err)
            }
            if(!user){
                res.status(400).send("Email o contraseña invalidos")
            }
            req.logIn(user, (err)=>{
                if(err){
                    next(err)
                }
                res.redirect('/')
            })

        })
    }

}

module.exports = controller
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const validateNewUser = require('../middlewares/validateNewUser')
const passport = require('passport')
const { checkNoAuth } = require('../middlewares/checkNoAuth')


/* GET users listing. */
router.get('/registro',checkNoAuth, userController.registry) //si el usuario está logueado no puede acceder a esta ruta
router.post('/registro', validateNewUser, userController.create)
router.get('/login', checkNoAuth, userController.login) //si el usuario está logueado no puede acceder a esta ruta
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuarios/login',
    failureFlash: true
}), userController.access)


module.exports = router;

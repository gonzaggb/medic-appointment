var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const validateNewUser = require('../middlewares/validateNewUser')
const validateLoginAccess = require('../middlewares/validateLoginAccess')

/* GET users listing. */
router.get('/registro', userController.registry)
router.post('/registro', validateNewUser, userController.create)
router.get('/login', userController.login)
router.post('/login', validateLoginAccess, userController.access)


module.exports = router;

const authConrollers = require('./controller');
const authValidators = require('./validator');
const authRoutes = require('express').Router();


authRoutes.get('/register', authConrollers.showRegisterPage);
authRoutes.post('/register',authValidators.registerValidation(),
                            authConrollers.checkValidation)







module.exports = authRoutes;
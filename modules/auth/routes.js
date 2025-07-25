const authConrollers = require('./controller');
const authValidators = require('./validator');
const authRoutes = require('express').Router();


authRoutes.get('/register', authConrollers.showRegisterPage);
authRoutes.post('/register',authValidators.registerValidation(),
                            authConrollers.checkValidation,
                            authConrollers.checkRecaptcha,
                            authConrollers.registerNewUser);




authRoutes.get('/login',authConrollers.showLoginPage);
authRoutes.post('/login',authValidators.loginValidation(),
                         authConrollers.checkValidation,
                         authConrollers.checkRecaptcha,
                         authConrollers.loginUser);















module.exports = authRoutes;
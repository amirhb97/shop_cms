const authConrollers = require('./controller');
const authValidators = require('./validator');
const passport = require('passport');
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
                         passport.authenticate('local',{
                           successRedirect:'/',
                           failureRedirect:'/auth/login',
                           failureMessage:true
                         }));

authRoutes.get('/logout',authConrollers.logOutUser);










module.exports = authRoutes;
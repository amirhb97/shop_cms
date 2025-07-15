const authConrollers = require('./controller');
const authRoutes = require('express').Router();


authRoutes.get('/register', authConrollers.showRegisterPage);








module.exports = authRoutes;
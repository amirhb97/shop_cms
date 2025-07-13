const authRoutes = require('./auth/routes');
const homeRoutes = require('./home/routes');
const allRoutes = require('express').Router();

allRoutes.use('/auth',allRoutes);
allRoutes.use('/',homeRoutes);


module.exports = allRoutes;
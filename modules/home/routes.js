const homeController = require('./controller');
const homeRoutes = require('express').Router();

homeRoutes.get('/',homeController.showHomepage);



module.exports = homeRoutes;
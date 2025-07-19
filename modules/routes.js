const authRoutes = require('./auth/routes');
const homeRoutes = require('./home/routes');
const allRoutes = require('express').Router();


//send req object to all views
allRoutes.use((req,res,next)=>{
    res.locals.req = {logedIn : req.isAuthenticated(),
                      user:req.user
                    }
    next();
});


allRoutes.use('/auth',authRoutes);
allRoutes.use('/',homeRoutes);


module.exports = allRoutes;
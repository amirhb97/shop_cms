const authRoutes = require('./auth/routes');
const homeRoutes = require('./home/routes');
const authMiddlewares = require('../middlewares/authenticated-middlewares');
const allRoutes = require('express').Router();


//send req object to all views

allRoutes.use(authMiddlewares.rememberLogin);


allRoutes.use((req,res,next)=>{
    res.locals.req = {logedIn : req.isAuthenticated(),
                      user:req.user
                    }
    next();
});



allRoutes.get('/auth/logout',async (req,res,next)=>{
   try {
            req.user.rememberToken = null ;
            await req.user.save();
            res.clearCookie('remember_token');
            req.logOut((err)=>{
                res.redirect('/')
            })
       }catch (error) {
          next (error);
       }
});


allRoutes.use('/auth',authMiddlewares.redirectIfAuthenticated,authRoutes);
allRoutes.use('/',homeRoutes);


module.exports = allRoutes;
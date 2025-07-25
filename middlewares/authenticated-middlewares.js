const UserModel = require('../models/users');

async function rememberLogin(req,res,next){
    try {
      
        if(!req.isAuthenticated()){
            const rememberToken = req.cookies.remember_token;
            if(rememberToken){
                const user = await UserModel.findOne({rememberToken});
                if(user){
                        req.login(user,err=>{
                        if(err) throw err;
                         next()
                    });
                }
            }
        }else{
            next();
        }


    } catch (error) {
        next(error);
    }
}


function redirectIfAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}


module.exports = {
    rememberLogin,
    redirectIfAuthenticated
}
const Controllers = require('../controller');

class AuthControllers extends Controllers {
    
    showRegisterPage(req,res,next){
        res.render('auth/register',{
           title : 'ثبت نام'
        });
    }

}


module.exports = new AuthControllers();
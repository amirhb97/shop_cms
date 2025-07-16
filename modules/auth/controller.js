const Controllers = require('../controller');



class AuthControllers extends Controllers {
    showRegisterPage(req,res,next){
         
        res.render('auth/register',{
           title : 'ثبت نام',
           v_errors : req.flash('v_errors'), //in array_form
           payload : {...req.flash('payload')[0]},
        });
    }

    

}


module.exports = new AuthControllers();
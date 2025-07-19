const Controllers = require('../controller');
const UserModel = require('../../models/users');
const authMessage = require('./message');
const {hashPassword} = require('../../utils/hash-utils'); 


class AuthControllers extends Controllers {
    showRegisterPage(req,res,next){ 
        res.render('auth/register',{
           title : 'ثبت نام',
           v_errors : req.flash('v_errors'), //in array_form
           payload : {...req.flash('payload')[0]},
           recaptcha: this.repatcha.render()
        });
    }

    async registerNewUser(req,res,next){
        try {
            const exitsUser = await UserModel.findOne({email:req.email});
            if(exitsUser){
                req.flash('v_errors',[`${authMessage.alreadyEmail}`]);
                return res.redirect(req.baseUrl+req.url);
            }

            req.body.password = hashPassword(req.body.password);
            const newUser = await UserModel.insertOne(req.body);
            
            //auto login after register
            //req.login(newUser,(err)=>{   
            // });

            req.flash('message',authMessage.registerSuccessful)
            res.redirect('/auth/login');

            
            
        } catch (error) {
            next(error);
        }
    
    }


    showLoginPage(req,res,next){
        res.render('auth/login',{
            title: 'ورود',
            v_errors : req.flash('v_errors'), //in array_form
            payload: {...req.flash('payload')[0]},
            message : req.flash('message'),
            recaptcha : this.repatcha.render()
        })
    }

    logOutUser(req,res,next){
        req.logout(()=>{
            res.redirect('/');
        });
    }


  
   

}


module.exports = new AuthControllers();
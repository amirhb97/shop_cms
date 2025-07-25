const Controllers = require('../controller');
const passport = require('passport');
const UserModel = require('../../models/users');
const authMessage = require('./message');
const {hashPassword} = require('../../utils/hash-utils'); 
const uniqueString = require('unique-string');


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
            const exitsUser = await UserModel.findOne({email:req.body.email});
            if(exitsUser){
                req.flash('v_errors',[`${authMessage.alreadyEmail}`]);
                return res.redirect(req.baseUrl+req.url);
            }

            req.body.password = hashPassword(req.body.password);
            const newUser = await UserModel.insertOne(req.body);
            
            //auto login after register
            //req.logIn(newUser,(err)=>{   
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

   loginUser(req,res,next){
        try {

            passport.authenticate('local',function (err,user,info){
                if(err) throw err
                if (!user) {
                    req.flash('v_errors',info.message);
                    return res.redirect('/auth/login');
                }

                req.logIn(user,async function (err){
                    if(err) throw err

                    if(req.body.remember){
                        const token = uniqueString();
                        res.cookie('remember_token',token,{
                            maxAge : 1000 * 60 * 60 * 24 * 10,
                            httpOnly : true
                        });

                        user.rememberToken = token ;
                        await user.save();

                    }
                    res.redirect('/');
                });

            })(req,res,next);



            //authenticate is generate a middleware function
            //so when you use inside another middleware function
            //you should call to run because of that we pass (req,res,next) as argument to the
            //middleware function which generate by authenticate to run
            
        } catch (error) {
            next(error)
        }
    }
  
   
}


module.exports = new AuthControllers();
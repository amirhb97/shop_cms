const {Strategy : LocalStrategy} = require('passport-local');
const {comparePassword} = require('../utils/hash-utils');
const UserModel = require('../models/users');

//localStrategy -->(username,password)
//passReqToCallback:true --> pass req object to the callback

function strategy(passport){
    
    passport.use(
        new LocalStrategy(
            {usernameField : 'email' , passwordField:'password' , passReqToCallback:true },
            async (req,email,password,done) => {
                try {

                    const user = await UserModel.findOne({email : email});
                    if(user){
                     
                        if(comparePassword(password,user.password)){
                            return done(null,user);
                        }
                    }
                    
                    return done(null,false,req.flash('v_errors',['ایمیل و یا رمزعبور نامعتبر می باشد']));
                
                    
                } catch (error) {
                    next(error)
                }

            }
        )
    )


    //set data to req.session
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    //set data from req.session to req.user
    passport.deserializeUser(async (id,done)=>{
        try {
            const user = await UserModel.findById(id);
            done(null,user);
        } catch (error) {
            next(error)
        }
    });
}



module.exports = strategy;
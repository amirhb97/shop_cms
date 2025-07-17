const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');

//Recaptcha
const RecaptchaV2 = require('express-recaptcha').RecaptchaV2;
const repatcha = new RecaptchaV2(process.env.SITE_KEY,process.env.SECRET_KEY,{hl:'fa'});


class Controller{
    constructor(){
        autoBind(this);
        this.repatcha = repatcha;
    }

    checkValidation(req,res,next){
        const {errors} = validationResult(req);
        if(errors.length > 0){
            const errorsMessage = []
            errors.forEach(err=>{
                errorsMessage.push(err.msg);
            });
           
            req.flash('payload', req.body);
            req.flash('v_errors',errorsMessage);
            
            res.redirect(req.baseUrl+req.url);   

        }
        else{
            next();
        }
    }

    checkRecaptcha(req,res,next){
        this.repatcha.verify(req,(err,data)=>{
            if(!err){
                return next()
            }
            req.flash('v_errors','لطفا تیک من ربات نیستم را بزنید ');
            req.flash('payload',req.body);
            res.redirect(req.baseUrl+req.url);
        })
    }




}


module.exports = Controller;
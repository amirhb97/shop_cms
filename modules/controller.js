const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');

class Controller{
    constructor(){
        autoBind(this);
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


}


module.exports = Controller;
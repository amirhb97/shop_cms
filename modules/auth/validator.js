const {body} = require('express-validator');
const authMessage = require('./message');


function registerValidation(){
    return [
        body('fullName').notEmpty().withMessage(authMessage.validation.fullName),
        body('email').isEmail().withMessage(authMessage.validation.email),
        body('password').isLength({min:8}).withMessage(authMessage.validation.password),
        body('rePassword').custom((value,{req})=>{
            if(value == req.body.password) return true
            return false
        }).withMessage(authMessage.validation.rePassword)
    ]
}


module.exports = {
    registerValidation
}
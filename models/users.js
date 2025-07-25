const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName : {type:String , require:true},
    email: {type:String , require:true, unique:true},
    password : {type:String , require:true},
    admin : {type : Boolean , default : false},
    rememberToken : {type:String , default:null}
},{timestamps:true});


module.exports = model('User',userSchema);

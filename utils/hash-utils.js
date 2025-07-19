const bcrypt = require('bcrypt');

function hashPassword(password){
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(password,salt)
    return hashPassword
    }

function comparePassword(password,hashPassword){
    return bcrypt.compareSync(password,hashPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}
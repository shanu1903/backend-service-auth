const Joi = require('@hapi/joi');
const registrationSchema = new  Joi.object({
    name : Joi.string()
        .min(6)
        .max(50)
        .required(),

    email : Joi.string()
        .min(6)
        .max(255)
        .required()
        .email(),

    password : Joi.string()
        .required()

});

const loginSchema = Joi.object({
    email : Joi.string()
        .required()
        .email(),

    password : Joi.string()
        .required()
})
function registerValidation(data){
    return registrationSchema.validate(data)
}


function loginValidation(data){
    return loginSchema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

const mongoose = require("mongoose");
const Joi = require('joi');
const{Schema}= require("mongoose");
const jwt =require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:Boolean
},{timestamps:true});
function validateRegister(user) {
    const schema =new Joi.object({
        name:Joi.string().min(3).max(30).required(),
        email:Joi.string().min(3).max(30).required().email(),
        password:Joi.string().min(5).required(),
    });

    return schema.validate(user);
};
function validateLogin(user) {
    const schema =new Joi.object({
        email:Joi.string().min(3).max(30).required().email(),
        password:Joi.string().min(5).required(),
    });

    return schema.validate(user);
};
userSchema.methods.createAuthToken = function(){
    const decodedToken= jwt.sign({_id:this._id,isAdmin:this.isAdmin},"jsonwebtoken");
    return decodedToken;
}
const User = mongoose.model("User",userSchema);


module.exports = {User, validateRegister, validateLogin};
const mongoose = require("mongoose")
const validator = require("validator")
const {Schema} = mongoose

const UserSchema = new Schema({
    
    name : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
            
        }
        
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    date :{
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('user' , UserSchema)
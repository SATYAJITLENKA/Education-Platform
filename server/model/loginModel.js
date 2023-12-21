const mongoose=require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const userScema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"please Enter Password"],
        minlength:[6,"minimun password length is 6"]

    }
})

const User=mongoose.model("userauthentication",userScema);
module.exports=User
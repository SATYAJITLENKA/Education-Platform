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

    },
    phone:{
        type:String,
        required:[true,"please Enter Phone Number"],
        // minlength:[10,"minimun password length is 10"]
    },
    age:{
        type:String,
        required:[true,"please Enter age "],
        // minlength:[10,"minimun password length is 10"]
    },
    city:{
        type:String,
        required:[true,"please Enter city"],
        // minlength:[10,"minimun password length is 10"]
    },
    state:{
        type:String,
        required:[true,"please Enter state"],
        // minlength:[10,"minimun password length is 10"]
    },
    pincode:{
        type:String,
        required:[true,"please Enter pincode"],
        // minlength:[10,"minimun password length is 10"]
    }

})

const User=mongoose.model("userauthentication",userScema);
module.exports=User
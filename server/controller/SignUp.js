const bcrypt =require ("bcrypt")
const {isEmail} =require ('validator')
const User=require('../model/loginModel.js')

const saltRounds=10;

const validateSignUpData=async(req,res)=>{
    const {name,email,password}=req.body;
    
    if(name.trim().length===0){
        res.status(400).json({message:"please enter a Name"})
        return false;
    }
    if(!isEmail(email)){
        res.status(400).json({message:"please enter a email"})
        return false;
    }
    if(password.trim().length===0){
        res.status(400).json({message:"please enter a Password"})
        return false;
    }else if(password.trim().length<=5){
        res.status(400).json({message:"Minimum password length is 6 character"})
        return false;
    }

    const existingUser=await User.findOne({email}).exec();
    if(existingUser){
        res.status(400).json({message:"Email already Registered"})
        return false;
    }

    return true
}
const signup =async(req,res)=>{
    const{name,email,password}=req.body;
    const isValid=await validateSignUpData(req,res)
    if(isValid){
        try{
            const hashedPassword=await bcrypt.hash(password,saltRounds)
            const user=await User.create({name,email,password:hashedPassword})
            res.json({
                message:"Account created successfully",
                user:{_id:user._id,name:user.name,email:user.email}
            })
        }catch(error){
            console.log(error)
        }
    }
}


const getData=async(req,res)=>{
   const data=await User.find();
   res.status(200).json({message:"successfully get all the data",data})
}

module.exports={signup,getData}
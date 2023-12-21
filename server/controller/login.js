const bcrypt =require("bcrypt")
const jwt =require ("jsonwebtoken")

const User=require('../model/loginModel.js')

const login=async(req,res)=>{
    const{email,password}=req.body;

    

    const dbUser=await User.findOne({email}).exec();

    if(dbUser){
        const match=await bcrypt.compare(password,dbUser.password);

        if(match){
            const token=jwt.sign(
                {_id:dbUser._id,name:dbUser.name,email},
                process.env.JWT_LOGIN_TOKEN,
                {expiresIn:"1d" }
            );
            res.json({
                message:"Login Successful",
                token,
            });
        }else{
            res.status(400).json({message:"Username or Password incorrect"})
        }
    }else{
        res.status(400).json({message:"No user is found with this email"})
    }
}


module.exports=login;
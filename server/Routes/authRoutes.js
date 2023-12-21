const {Router}=require('express')
const {signup,getData}=require('../controller/SignUp.js')
const login =require("../controller/login.js")
const auth =require("../controller/auth.js")

const router=Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/auth',auth)
router.get('/get',getData)











module.exports=router;

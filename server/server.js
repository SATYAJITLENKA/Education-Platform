// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import dotenv from 'dotenv'
const express =require("express")
const mongoose =require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const router =require('./Routes/authRoutes.js')





const app=express()
app.use(express.json())
app.use(cors())
dotenv.config({path:'./dotenv/.env'})

const port =  process.env.PORT ||5000 

app.use('/api',router)


//database connection
const databaseConnection=async()=>{
   
    mongoose.connect(process.env.URL)
    .then(()=>console.log("databse connected"))
    .catch((err)=>console.log(err))
}







app.listen(port ,()=>{
    
    databaseConnection()
    console.log(`server is running on http://localhost:${port}`)
})
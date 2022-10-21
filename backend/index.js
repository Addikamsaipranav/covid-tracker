const express = require("express")
const cors = require("cors")
const  mongoose = require("mongoose")

const app = express()

app.use(express.json())

app.use(express.urlencoded())

app.use(cors())

mongoose.connect("mongodb://localhost:27017/coronauserDB",{
    useNewUrlParser : true,
    useUnifiedTopology : true
},()=>{
    console.log("DB CONNECTED")
})

const userSchema =new  mongoose.Schema({
    name : String,
    email :String,
    password :String
})

const User =new mongoose.model("User",userSchema)



//routes
app.post("/login",(req,res)=>{
    const {email,password} = req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
             if(password === user.password) {
                 res.send({
                     message : "Login successfully",user :user
                 })
             }else{
                 res.send({
                     message:"Password didnt match"
                 })
             }
        }
        else{
            res.send({
                message :"USer not Registered"
            })
        }
    })
})

app.post("/register",(req,res)=>{
     const {name,email,password}=req.body
     User.findOne({email:email},(err,user)=>{
         if(user){
             res.send({
                 message : " USer already Registered"
             })
         }
         else{
            const user = new User({
                name ,
                email,
                password
             })
             user.save(err=>{
                 if(err){
                     res.send(err)
                 }
                 else{
                     res.send({
                         message : "successfully Registered , Please login now"
                     })
                 }
             })
         }
     })
   
})

app.listen(8000,()=>{
    console.log("Server started")
})
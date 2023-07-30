const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
// const jwt=require("bcryptjs");

require('../db/conn');
const User=require("../model/userSchema");
const Authenticate = require('../middleware/Authenticate');

router.get('/',(req,res)=>{
    res.send("Hello Wolrd in router/auth/home");
});

router.post('/register',async(req,res)=>{
    const {name ,email, password, cpassword}=req.body;
    if(!name || !email || !password || !cpassword){
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(cpassword);
        return res.json({error:"plz filled the filed properly"});
    }
    try{
        const userExit=await User.findOne({email:email});
        if(userExit){
            return res.status(422).json({error:"Email already exists"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password not mached"});
        }
        else{
            const user = new User({name,email,password,cpassword});
            await user.save();
            res.status(201).json({message:"registered successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz fill the data"});
        }

        const userLogin=await User.findOne({email:email});
        // console.log(userLogin);
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token=await userLogin.generateAuthToken();
            console.log(token);
            //cookie
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true,
                // sameSite: "none",
                // secure: true
            });
            
            if(!isMatch){
                res.status(400).json({error:"Invalid Credential"});
            }
            else{
                res.json({message:"user login successfull"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credential"});
        }
    }catch(err){
        console.log(err);
    }
});

router.get('/profile',Authenticate,(req,res)=>{
    console.log("profile");
    res.send(req.rootUser);
});
module.exports=router;

// router.post('/register',(req,res)=>{
//     const {name ,email, phone, work, password, cpassword}=req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.json({error:"plz filled the filed properly"});
//     }
//     User.findOne({email:email})
//         .then((userExit)=>{
//             if(userExit){
//                 return res.status(422).json({error:"Email already exists"});
//             }
//             const user = new User({name,email,phone,work,password,cpassword});
//             user.save().then(()=>{
//                 res.status(201).json({message:"registered successfully"});
//             }).catch((err)=>res.status(500).json({error:"Failed to registered"}));
//         }).catch(err=>{console.log(err);});
// });

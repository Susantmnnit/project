import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config({path:'./config.env'});
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
},).then(()=> console.log('connected successfuly'))
.catch((err)=>{console.log("err");});


const userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  email:{
    type:String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  cpassword:{
    type: String,
    require: true
  },
  date:{
    type:Date,
    default:Date.now
  },
  details:[
    {
      name:{
        type: String,
        require: true
      },
      pname:{
        type: String,
        require: true
      },
      adhar:{
        type: String,
        require: true
      },
      padhar:{
        type: String,
        require: true
      },
      address:{
        type: String,
        require: true
      },
      table:{
        type: String,
        require: true
      }
    }
  ],
  tokens:[
    {
        token:{
            type:String,
            required:true
        }
    }
  ]
});

userSchema.pre('save',async function(next){
  console.log("hi from inside");
  if(this.isModified('password')){
      this.password=await bcrypt.hash(this.password,12);
      this.cpassword=await bcrypt.hash(this.cpassword,12);
  }
  next();
})
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens.push({ token });
    await this.save(); 
    return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addDetails = async function(name,pname,adhar,padhar,address,table){
   try{
      this.details = this.details.concat({name,pname,adhar,padhar,address,table});
      await this.save();
      return this.details;
   }catch(err){
    console.log(err);
   }
}

const User = new mongoose.model("User", userSchema)

//Routes

  app.post("/register", async (req, res) => {
    try {
      const { name, email, password,cpassword } = req.body;
      const user = await User.findOne({ email: email }).exec();
  
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          cpassword
        });
  
        await newUser.save();
  
        res.send({ message: "Successfully Registered, Please login now." });
      }
    } catch (error) {
      // Handle any potential errors
      console.error("Registration error:", error);
      res.status(500).send({ message: "Internal server error" });
    }
});  

const Authenticate = async (req,res,next)=>{
  try{
    const token=req.cookies.jwtoken;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id: verifyToken._id,"tokens.token":token});
    if(!rootUser){
        throw new Error('User not found');
    }

    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;

    next();
  }catch(err){
    res.status(401).send('Unauthorized no token provided');
    console.log(err);
  }
};

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get('/profile', Authenticate, (req, res) => {
  console.log("Profile");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

app.post('/details', Authenticate, async (req,res) => {
    try{
        const {name,pname,adhar,padhar,address,table}=req.body;

        if( !name || !pname || !adhar || !padhar || !address || !table){
            console.log("error in booking");
            return res.json({error:"Filled all the details correctly"});
        }

        const userDetails =await User.findOne({_id:req.userID});

        if(userDetails){

          const userBookingDetails = await userDetails.addDetails(name,pname,adhar,padhar,address,table);

          await userDetails.save(); 
          
          res.status(201).json({message:"User Booking Details Received Successfully"});

        }
    }catch(err){
      console.log(err);
    }
});


app.listen(9002,() => {
    console.log("BE started at port 9002")
})


// const express=require("express");
// const mongoose=require("mongoose");
// const app=express()
// mongoose.connect("mongodb://127.0.0.1:27017/allow",{
//     // useNewUrlParser:true,useUnifiedTopology:true
// },)
// .then(()=> console.log('connected successfully'))
// .catch((err)=>{console.log(err);});

// app.listen(3000,()=>{
//     console.log("running on port")
// })
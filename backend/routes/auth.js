import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

const cookieOptions={
    httpOnly:true,
    secure:process.env.Node_ENV==='production',
    sameSite:'lax',
    maxAge:1000*60*60*2487
};

//register
router.post('/register',async(req,res)=>{
    try{
        const{ name,email,password}=req.body;
        if(!name||!email||!password)return res.status(400).json({message:'Missing fields'});

        const existing=await User.findOne({email});
        if(existing)return res.status(400).json({message:'Email already in use'});

        const salt=await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt);

        const user=await User.create({name,email,password:hashed});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

       res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});
res.json({ user });


    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});

    }
});

//login
router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password) return res.status(400).json({message:'Missing fields'});

        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid credentials'});

        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message:'Invalid creadentials'});

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"});

        res.cookie('token',token,cookieOptions).json({message:'Logged in',user:{id:user._id,name:user.name,email:user.email,plan:user.plan}});


    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});

    }
});

//logout
router.post('/logout',(req,res)=>{
    res.clearCookie('token',{sameSite:'lax',secure:process.env.NODE_ENV==='production'}).json({message:'Logged out'});
});

//check session
router.get('/me',async(req,res)=>{
   try{
    const token=req.cookies?.token;
    if(!token) return res.status(200).json({user:null});
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select('-password');
    res.json({user});
   }catch(err){
    return res.status(200).json({user:null});
   }
});

export default router;

/*const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const User=require('../models/User');

//get user profile
router.get('/profile',auth,async(req,res)=>{
    const user=await User.findById(req.user.id).select('-password');
    res.json({user});
});

//update settings
router.put('/settings',auth,async(req,res)=>{
    try{
        const updates=req.body;
        const allowed=['settings.darkMode','settings.notifications'];
        
        const user=await User.findById(req.user.id);
        if(!user) return res.status(404).json({message:'User not found'});

        if(updates.settings){
            if(typeof updates.settings.darkMode!=='undefined') user.settings.darkMode=updates.settings.darkMode;
            if(typeof updates.settings.notifications!=='undefined') user.settings.notifications=user.settings.notifications;

        }

        await user.save();
        res.json({message:'Settings updated',settings:user.settings});

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});

    }
});


//help
router.get('/help',(req,res)=>{
    res.json({
        faqs:[
            {q:'How do I change my password?',a:'Go to settings and use the change password option.'},
            {q:'How do I upgrade plan?',a:'Visit /upgrade to see plans and pay via the chosen provider.'}
        ],
        contact:{
            email:'support@rivora.app', skyup:null
        }
    });
});

//upgrade plan
router.post('/upgrade',auth,async(req,res)=>{
    try{
        const {plan,months}=req.body;
        if(!plan) return res.status(400).json({message:'Plan required'});

        const user=await User.findById(req.user.id);
        if(!user) return res.status(404).json({message:'User not found'});

        const monthsNum=Number(months)||1;
        const now=new Date();
        constexpires=new Date(now.setMonth(now.getMonth()+monthsNum));

        user.plan.name=plan;
        user.plan.expiresAt=expires;

        await user.save();

        res.json({message:'Plan upgraded',plan:user.plan});
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});

    }
});

module.exports=router;*/

import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json({ user });
});

// UPDATE SETTINGS
router.put("/settings", auth, async (req, res) => {
  const user = await User.findById(req.user);

  user.settings = {
    ...user.settings,
    ...req.body.settings,
  };

  await user.save();

  res.json({ message: "Updated", settings: user.settings });
});

// HELP PAGE DATA
router.get("/help", (req, res) => {
  res.json({
    faqs: [
      { q: "How to use Rivora?", a: "Start by creating threads." },
      { q: "How to upgrade plan?", a: "Visit /upgrade and select a plan." },
    ],
    contact: { email: "support@rivora.com" },
  });
});

// UPGRADE PLAN
router.post("/upgrade", auth, async (req, res) => {
  const { plan, months } = req.body;
  const user = await User.findById(req.user);

  const expire = new Date();
  expire.setMonth(expire.getMonth() + (months || 1));

  user.plan = {
    name: plan,
    expiresAt: expire,
  };

  await user.save();

  res.json({ message: "Plan upgraded", plan: user.plan });
});

export default router;




import mongoose from "mongoose";

const planSchema=new mongoose.Schema({
    name:{
        type:String,
       default:'free',

    },
    expiresAt:{
        type:Date,
        default:null
    }
});
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
      type:String,
      required:true

    },
    settings:{
       darkMode:{
        type:Boolean,
        default:false
       },
       notifications:{
        type:Boolean,
        default:true
       }
    },
    plan:{
        type:planSchema,
        default:()=>({})
    },
},
{
    timestamps:true
});

export default mongoose.model("User", userSchema);
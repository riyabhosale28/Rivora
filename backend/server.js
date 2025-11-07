import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app=express();
const PORT=5000;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}




// app.post("/test",async (req,res)=>{
//     const options={
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body:JSON.stringify({
// model:"gpt-4o-mini",
// messages:[    
//     {
//     role:"user",
//     content:req.body.message
//     }
// ]
//         })
//     };
//     try{
//         const response = await fetch("https://api.openai.com/v1/chat/completions",options);
//         const data=await response.json();
//         //console.log(data.choices[0].message.content);
//         res.send(data.choices[0].message.content);
//     }catch(err){
// console.log(err);
//     }
// })

/*import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ------------------------
// GET route for browser / testing
app.get("/", (req, res) => {
  res.send("Server is running. Use POST /test with JSON { message: 'your message' }");
});

// ------------------------
// POST route for OpenAI API
app.post("/test", async (req, res) => {
  try {
    console.log("Received POST /test with body:", req.body);

    // Prepare body for OpenAI API
    const body = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: req.body.message || "Hello!"
        }
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    res.json(data);

  } catch (err) {
    console.error("Error calling OpenAI API:", err.message || err);
    res.status(500).json({ error: "Something went wrong connecting to OpenAI" });
  }
});

// ------------------------
// Catch-all route for undefined URLs
app.use( (req, res) => {
  res.status(404).send("404 Not Found - The requested URL does not exist on this server.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/




/*import OpenAI from 'openai';
import 'dotenv/config';
const client =new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,

});

const response =await client.responses.create({
    model: 'gpt-4o-mini',
    
    input:'joke related to diploma',
});

console.log(response.output_text);*/
// import "dotenv/config";

// const getOpenAIAPIResponse=async(message)=>{
//     const options={
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
//             },
//             body:JSON.stringify({
//     model:"gpt-4o-mini",
//     messages:[    
//         {
//         role:"user",
//         content:message
//         }
//     ]
//             })
//         };
//         try{
//             const response = await fetch("https://api.openai.com/v1/chat/completions",options);
//             const data=await response.json();
//             //console.log(data.choices[0].message.content);
//             return data.choices[0].message.content;
//         }catch(err){
//     console.log(err);
//         }
// }

// export default getOpenAIAPIResponse;


// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "user",
//                     content: message
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();

//         // Check if API returned an error
//         if (!data.choices || !data.choices[0]) {
//             console.log("OpenAI API Error:", data);
//             return "Sorry, AI response failed.";
//         }

//         return data.choices[0].message.content;

//     } catch (err) {
//         console.log("OpenAI Fetch Error:", err);
//         return "AI service unavailable.";
//     }
// };

// export default getOpenAIAPIResponse;


// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//                 { role: "user", content: message }
//             ]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();

//         console.log("OpenAI response:", data);   // 👈 IMPORTANT

//         if (!data.choices || !data.choices[0]) {
//             return "Sorry, AI response failed.";
//         }

//         return data.choices[0].message.content;

//     } catch (err) {
//         console.log("Fetch error:", err);
//         return "AI service unavailable.";
//     }
// };

// export default getOpenAIAPIResponse;

import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getOpenAIAPIResponse = async (message) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    return chatCompletion.choices[0].message.content;

  } catch (error) {
    console.log("Groq error:", error);
    return "AI response failed.";
  }
};

export default getOpenAIAPIResponse;
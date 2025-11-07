import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import {MyContext} from "./MyContext.jsx";
import {useState ,useContext,useEffect } from "react";
import {ScaleLoader} from "react-spinners";
function ChatWindow(){
    const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(MyContext);
    const [loading,setLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(true);

    const getReply=async()=>{
         if (!prompt.trim()) return;
         const userMessage = prompt;
        setLoading(true);
        setNewChat(false);
        const options ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:userMessage,
                threadId:currThreadId

            
        }),
    };
    try{
const response=await fetch("http://localhost:5000/api/chat",options);
const res=await response.json();
setReply(res.reply);
setPrevChats(prev=>[
    ...prev,
    {role:"user",content:userMessage},
    {role:"assistant",content:res.reply},
]);

    }catch(err){
        console.log(err);
    }finally{
        setPrompt("");
    setLoading(false);
}
};

   /*useEffect(()=>{
    if(prompt && reply){
        setPrevChats(prevChats=>(
            [...prevChats,{
                role:"user",
                content:prompt
            },{
                role:"assistant",
                content:reply
            }]
        ))
    }
    setPrompt("");
   },[reply])*/

const handleProfileClick=()=>{
    setIsOpen(!isOpen);
}
    return(
        <div className="chatWindow">
           <div className="navbar">
            <span>Rivora<i className="fa-solid fa-angle-down"></i></span>
            <div className="userIconDiv" onClick={handleProfileClick}>
                <span className="userIcon"><i className="fa-solid fa-user"></i></span>
            </div>
           </div>
           {
            isOpen && 
            <div className="dropDown">
            <div className="dropDownItem"><i class="fa-solid fa-gear"></i>&nbsp;Settings</div>
            <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i>&nbsp;Upgrade Plan</div>
            <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;Logout</div>
            <div className="dropDownItem"><i class="fa-solid fa-handshake-angle"></i>&nbsp;Help</div>
            </div>
           }
           <Chat></Chat>
           {loading && (<ScaleLoader color="#fff" loading={loading}></ScaleLoader>)}
            <div className="chatInput">
           <div className="inputBox">
            <input placeholder="Ask  anything"  
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e)=>e.key==='Enter'? getReply():''}>
           
            
            </input>
            
            <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
           </div>
           <p className="info">
            Rivora can make mistakes. Check important info. See Cookie Preferences.
           </p>
            </div>
           </div>
    )
}

export default ChatWindow;

import "./Chat.css";
import { useContext,useEffect,useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat(){
    const {newChat,prevChats,reply}=useContext(MyContext);
    const [latestReply,setlatestReply]=useState(null);
    useEffect(()=>{

        if(reply===null){
            setlatestReply(null);
            return;
        }
     if(!prevChats?.length)return;
     const content=reply.split("");
     let idx=0;
     const interval=setInterval(()=>{
        setlatestReply(content.slice(0,idx+1).join(""));
        idx++;
        if(idx >=content.length)clearInterval(interval);
     },40);
     return()=>clearInterval(interval);

    },[prevChats,reply])
    return(
        <>
        {newChat && <h1>Let's start a new Chat</h1>}
        <div className="chats">
  {prevChats?.slice(0, -1).map((Chat, idx) => (
    <div className={Chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
      {Chat.role === "user" ? (
        <p className="userMessage">{Chat.content}</p>
      ) : (
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {Chat.content}
        </ReactMarkdown>
      )}
    </div>
  ))}
  {
    prevChats.length>0 &&(
        <>
        {
            latestReply===null ?(
                 <div className="gptDiv" key="non-typing">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {prevChats[prevChats.length-1].content}
      </ReactMarkdown>
    </div>
            ):(
                 <div className="gptDiv" key="typing">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {latestReply}
      </ReactMarkdown>
    </div>
            )
        }
        </>

    )
  }

  
</div>

        </>
    )
}

export default Chat;

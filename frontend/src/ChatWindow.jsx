import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { AuthContext } from "./AuthContext.jsx";

import { useState, useContext } from "react";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };

  const getReply = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setLoading(true);
    setNewChat(false);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: userMessage,
          threadId: currThreadId,
        }),
      });

      const res = await response.json();

      setReply(res.reply);
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: res.reply },
      ]);
    } catch (err) {
      console.log("Chat error:", err);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Rivora <i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem" onClick={() => navigate("/settings")}>
            <i className="fa-solid fa-gear"></i>&nbsp;Settings
          </div>

          <div className="dropDownItem" onClick={() => navigate("/upgrade")}>
            <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;Upgrade Plan
          </div>

          <div
            className="dropDownItem"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            &nbsp;Logout
          </div>

          <div className="dropDownItem" onClick={() => navigate("/help")}>
            <i className="fa-solid fa-handshake-angle"></i>&nbsp;Help
          </div>
        </div>
      )}

      <Chat />

      {loading && <ScaleLoader color="#fff" loading={loading} />}

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          Rivora can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;


/*import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useContext } from "react";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

import { Routes, Route, Navigate } from "react-router-dom";

import Settings from "./components/Settings.jsx";
import Help from "./components/Help.jsx";
import Upgrade from "./components/Upgrade.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import { AuthContext } from "./AuthContext.jsx";

// Protect pages if not logged in
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}


function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  const ChatLayout=()=>{
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  }
  return (
      <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route 
    path="/"
    element={
      <ProtectedRoute>
        <ChatLayout></ChatLayout>
      </ProtectedRoute>
    }
    />
    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

    <Route 
    path="/help"
    element={
      <ProtectedRoute>
        <Help />
      </ProtectedRoute>
    }
    />

    <Route 
    path="/upgrade"
    element={
      <ProtectedRoute>
        <Upgrade />
      </ProtectedRoute>
    }
    />
    <Route path="*"
    element={<Navigate to="/" />} />

     </Routes>

    
  )
}

export default <App></App>*/

// frontend/src/App.jsx
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";

import { useState, useContext } from "react";
import { v1 as uuidv1 } from "uuid";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Settings from "./components/Settings.jsx";
import Help from "./components/Help.jsx";
import Upgrade from "./components/Upgrade.jsx";

import { AuthContext } from "./AuthContext.jsx";

// Protect routes that require login
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// layout for chat page (your old App UI)
function ChatLayout() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app">
        <Sidebar />
        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upgrade"
        element={
          <ProtectedRoute>
            <Upgrade />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


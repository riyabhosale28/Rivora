import { useContext, useState } from "react";
import API from "../api";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const nav = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      setUser(res.data.user);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        {err && <p className="error">{err}</p>}

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" 
            value={email} onChange={(e)=>setEmail(e.target.value)} />

          <input type="password" placeholder="Password" 
            value={password} onChange={(e)=>setPassword(e.target.value)} />

          <button>Login</button>
        </form>

        <p>
          New here? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext.jsx";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      setUser(res.data.user);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Create Account</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={handleRegister}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

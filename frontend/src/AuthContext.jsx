/*import { createContext, useEffect, useState } from "react";
import API from "./api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me",{withCredentials:true});
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

   const logout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}*/



// frontend/src/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import API from "./api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check existing session on first load
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await API.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await API.post(
      "/auth/register",
      { name, email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.log("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

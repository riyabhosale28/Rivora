import { createContext, useEffect, useState } from "react";
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
}

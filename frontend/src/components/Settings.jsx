import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import API from "../api";
import "../styles/auth.css";
import "../components/pages.css";


export default function Settings() {
  const { user, setUser } = useContext(AuthContext);

  const [dark, setDark] = useState(user.settings?.darkMode);
  const [notif, setNotif] = useState(user.settings?.notifications);
  const [msg, setMsg] = useState("");

  const save = async () => {
    try {
      const res = await API.put("/user/settings", {
        settings: { darkMode: dark, notifications: notif },
      });
      setUser({ ...user, settings: res.data.settings });
      setMsg("Saved!");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Failed!");
    }
  };

  return (
    <div className="page">
      <h2>Settings</h2>

      <label>
        <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
        Enable Dark Mode
      </label>

      <label>
        <input type="checkbox" checked={notif} onChange={() => setNotif(!notif)} />
        Enable Notifications
      </label>

      <button onClick={save}>Save</button>

      {msg && <p className="success">{msg}</p>}
    </div>
  );
}

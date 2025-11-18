import { useContext, useState } from "react";
import API from "../api";
import { AuthContext } from "../AuthContext";

const plans = [
  { id: "pro", name: "Pro", price: 9 },
  { id: "business", name: "Business", price: 29 },
];

export default function Upgrade() {
  const { user, setUser } = useContext(AuthContext);

  const [plan, setPlan] = useState("pro");
  const [months, setMonths] = useState(1);
  const [msg, setMsg] = useState("");

  const upgrade = async () => {
    try {
      const res = await API.post("/user/upgrade", { plan, months });
      setUser({ ...user, plan: res.data.plan });
      setMsg("Upgraded!");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Failed!");
    }
  };

  return (
    <div className="page">
      <h2>Upgrade Plan</h2>

      {plans.map((p) => (
        <label key={p.id}>
          <input
            type="radio"
            name="plan"
            checked={plan === p.id}
            onChange={() => setPlan(p.id)}
          />
          {p.name} — ${p.price}/month
        </label>
      ))}

      <br />

      <label>
        Months:{" "}
        <input type="number" value={months} min="1" onChange={(e) => setMonths(e.target.value)} />
      </label>

      <button onClick={upgrade}>Upgrade</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

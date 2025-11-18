import { useEffect, useState } from "react";
import API from "../api";

export default function Help() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/user/help").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Help & FAQ</h2>

      {data.faqs.map((f, i) => (
        <div key={i}>
          <strong>{f.q}</strong>
          <p>{f.a}</p>
        </div>
      ))}

      <h3>Contact</h3>
      <p>{data.contact.email}</p>
    </div>
  );
}

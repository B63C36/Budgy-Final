import { useState } from "react";
import Sidebar from "./tools/sidebar";

export default function Advisor() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await res.json();

    if (data.reply) {
      setResponse(data.reply);
    } else if (data.error) {
      setResponse("Error: " + data.error);
    } else {
      setResponse("No response received.");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <Sidebar/>
      <div className="main-content">
        <h1>AI Financial Advisor</h1>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Im here to help you save money! Just ask me how!"
          rows={4}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Im just thinking..." : "Ask AI"}
        </button>
        <div className="response-box">
          <strong>Response:</strong> {response}
        </div>
      </div>
    </div>
  );
}

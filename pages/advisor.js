import { useState } from "react";// import the useState tool from react
import Sidebar from "./tools/sidebar";// import the sidebar

export default function Advisor() {// main function
  const [userInput, setUserInput] = useState(""); // holds users text
  const [response, setResponse] = useState(""); // holds ai response
  const [loading, setLoading] = useState(false); // adds loading so you cant press ask ai button many times
 
  const handleAsk = async () => { // run function what ask ai button clicked
    setLoading(true); // displays the im thinking message.
    setResponse(""); // clears old response

    const res = await fetch("/api/chat", { // sends users message to the api route at /api/chat
      method: "POST", // post because we are sending data
      headers: { "Content-Type": "application/json" }, // tells the server we are sending json data.
      body: JSON.stringify({ message: userInput }), // changes data to json string.
    });

    const data = await res.json(); // gets the ai response and changes from json
    if (data.reply) {
      setResponse(data.reply); // display response
    } else if (data.error) {
      setResponse("Error: " + data.error); // if there was an error show the error
    } else {
      setResponse("No response received."); // if nothing display no reponse message
    }
    setLoading(false); // reset loading so user can enter new message
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>AI Financial Advisor</h1>

        <textarea // user input box
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)} // when the user types update the userInput
          placeholder="Im here to help you save money! Just ask me how!"
          rows={4}
        />

        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Im just thinking..." : "Ask AI"}
        </button>

        <div className="response-box">
          <strong>Response:</strong> {response} {/* ai response goes here */}
        </div>
      </div>
    </div>
  );
}
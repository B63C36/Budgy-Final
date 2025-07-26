export default async function handler(req, res) {
  const { message } = req.body; // gets the message from the request body

  try {
    const response = await fetch("http://localhost:11434/v1/chat/completions", { // sends request to the ollama api
      method: "POST", // post for sending data
      headers: {
        "Content-Type": "application/json", // tells server its in json form
      },
      body: JSON.stringify({
        model: "llama3.2", // uses this ai model
        messages: [{ role: "user", content: message }], // users message sent
      }),
    });

    const data = await response.json();

    console.log("Ollama API Response:", data); // logs api response

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "Invalid response from Ollama" });
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) { //catch error
    console.error("Error:", error); // logs error
    res.status(500).json({ error: "Something went wrong with Ollama" });
  }
}

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("http://localhost:11434/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    console.log("Ollama API Response:", data);

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "Invalid response from Ollama" });
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong with Ollama" });
  }
}

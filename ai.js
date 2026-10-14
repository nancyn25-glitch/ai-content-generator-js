
const generateBtn = document.getElementById("generateBtn");
const summarizeBtn = document.getElementById("summarizeBtn");
const ideaBtn = document.getElementById("ideaBtn");
const defineBtn = document.getElementById("defineBtn");
const inputBox = document.getElementById("prompt");
const outputBox = document.getElementById("output");

const API_KEY = "AIzaSyCOlqvlRW7NxGK0W3Rm-ESXrh3Xpxnd1DQ"; 


const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Bad Request");
    }

    const data = await response.json();

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI"
    );
  } catch (error) {
    return "API Error ❌";
  }
};

generateBtn.addEventListener("click", async () => {
  const userPrompt = inputBox.value;

  if (userPrompt === "") {
    outputBox.innerText = "Please enter a question.";
    return;
  }

  outputBox.innerText = "Thinking... ⏳";

  const result = await fetchGeminiResponse(userPrompt);
  outputBox.innerText = result;
});


summarizeBtn.addEventListener("click", async () => {
  const text = inputBox.value;

  if (text === "") {
    outputBox.innerText = "Paste text to summarize.";
    return;
  }

  outputBox.innerText = "Summarizing... ⏳";

  const prompt = "Summarize this in short: " + text;

  const result = await fetchGeminiResponse(prompt);
  outputBox.innerText = result;
});

ideaBtn.addEventListener("click", async () => {
  const text = inputBox.value;

  if (text === "") {
    outputBox.innerText = "Enter a topic for ideas.";
    return;
  }

  outputBox.innerText = "Generating ideas... ⏳";

  const prompt = "Give creative ideas about: " + text;

  const result = await fetchGeminiResponse(prompt);
  outputBox.innerText = result;
});


defineBtn.addEventListener("click", async () => {
  const text = inputBox.value;

  if (text === "") {
    outputBox.innerText = "Enter a word.";
    return;
  }

  outputBox.innerText = "Finding meaning... ⏳";

  const prompt = "Explain this in simple words: " + text;

  const result = await fetchGeminiResponse(prompt);
  outputBox.innerText = result;
});
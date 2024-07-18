require("dotenv").config();
const generateCustomPrompt = require("./customPrompt");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 8008;

// Middleware
app.use(cors());
app.use(express.json());

const generateText = async (customPrompt) => {
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.IBM_API_KEY}`,
  };
  const body = {
    input: customPrompt,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 8000,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1,
    },
    model_id: "ibm/granite-13b-chat-v2",
    project_id: "e393fe30-ffff-459e-9687-c26a86e8cc96",
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// API endpoint

app.post("/generate-text", async (req, res) => {
  const { componentCode } = req.body;

  if (!componentCode) {
    return res.status(400).json({ error: "Component name is required" });
  }

  const customPrompt = generateCustomPrompt(componentCode);

  try {
    const result = await generateText(customPrompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while generating text" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

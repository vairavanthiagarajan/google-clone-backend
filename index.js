const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to Google Clone Backend API!");
});


app.get("/search", async (req, res) => {
  const query = req.query.q;
  const start = req.query.start || 1;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  console.log("Using API Key:", process.env.GOOGLE_API_KEY ? "Loaded ✅" : "Missing ❌");
  console.log("Using CX ID:", process.env.GOOGLE_CX_ID ? "Loaded ✅" : "Missing ❌");

  try {
    const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        q: query,
        start: start,
        key: process.env.GOOGLE_API_KEY, 
        cx: process.env.GOOGLE_CX_ID,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Google API Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Error fetching search results",
      details: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

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
    res.status(500).json({ error: "Error fetching search results" });
  }
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

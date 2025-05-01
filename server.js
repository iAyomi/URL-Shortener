import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
const PORT = 4000;

const urlMap = {};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/shorten", (req, res) => {
  const { longURL } = req.body;

  if (!longURL) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortURLid = nanoid(6);
  urlMap[shortURLid] = longURL;
  const shortURL = `http://localhost:${PORT}/${shortURLid}`;

  res.json({ longURL, shortURL });
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

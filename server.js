import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { PORT } from "./src/utils";

const app = express();

const urlMap = {};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get URL Stats by shortURLpath
app.get("/api/statistic/:shortURLpath", (req, res) => {
  const { shortURLpath } = req.params;

  if (!shortURLpath) {
    return res.status(400).json({ error: "Short URL path is required" });
  }

  const foundObjWithShortURLPath = Object.entries(urlMap).find(
    ([_, data]) => data.shortURLpath === shortURLpath
  );

  if (foundObjWithShortURLPath) {
    return res.json({
      longURL: foundObjWithShortURLPath[1].longURL,
      dateCreated: foundObjWithShortURLPath[1].dateCreated,
      accessCount: foundObjWithShortURLPath[1].accessCount,
    });
  }

  res.status(404).json({ error: "Short URL not found" });
});

// Get all URL list
app.get("/api/list", (req, res) => {
  const query = req.query.search?.toLowerCase() || "";

  const filteredURLs = Object.entries(urlMap)
    .filter(([longURL, data]) => {
      return longURL.toLowerCase().includes(query);
    })
    .map(([longURL, data]) => ({
      ...data,
    }));

  res.json({ filteredURLs });
});

// Encode a URL
app.post("/api/encode", (req, res) => {
  const { longURL } = req.body;

  if (!longURL) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (urlMap[longURL]) {
    return res.json({
      longURL,
      shortURL: urlMap[longURL].shortURL,
      message: "URL has already been encoded",
    });
  }

  const shortURLpath = nanoid(6);
  const shortURL = `http://localhost:${PORT}/${shortURLpath}`;
  const dateCreated = new Date().toUTCString();
  const accessCount = 0;

  urlMap[longURL] = {
    shortURLpath,
    longURL,
    shortURL,
    dateCreated,
    accessCount,
  };

  res.json({ longURL, shortURL });
});

// Decode a URL
app.post("/api/decode", (req, res) => {
  const { shortURLpath } = req.body;

  if (!shortURLpath) {
    return res.status(400).json({ error: "Short URL path is required" });
  }

  const foundObjWithShortURLPath = Object.entries(urlMap).find(
    ([_, data]) => data.shortURLpath === shortURLpath
  );

  if (foundObjWithShortURLPath) {
    return res.json({ longURL: foundObjWithShortURLPath[1].longURL });
  }

  res.status(404).json({ error: "Short URL not found" });
});

// Redirect shortURL => longURL
app.get("/:shortURLpath", (req, res) => {
  const { shortURLpath } = req.params;

  if (!shortURLpath) {
    return res.status(400).json({ error: "Short URL path is required" });
  }

  const foundObjWithShortURLPath = Object.entries(urlMap).find(
    ([_, data]) => data.shortURLpath === shortURLpath
  );

  if (foundObjWithShortURLPath) {
    foundObjWithShortURLPath[1].accessCount += 1;
    return res.redirect(foundObjWithShortURLPath[1].longURL);
  }

  res.status(404).json({ error: "URL not found" });
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

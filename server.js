import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 4000;

const urlDataByHash = {};
const urlDataByShortURLPath = {};

const hashLongURL = (longURL) => {
  const hash = crypto.createHash("sha256");
  hash.update(longURL);
  return hash.digest("hex");
};

const truncateHash = (hash, store, truncVal = 6) => {
  const truncatedHash = hash.slice(0, truncVal);
  if (store[truncatedHash]) {
    return truncateHash(hash, store, truncVal + 1);
  }
  return truncatedHash;
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get URL Stats by shortURLpath
app.get("/api/statistic/:shortURLpath", (req, res) => {
  const { shortURLpath } = req.params;

  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  const { longURL } = data;
  const hashedLongURL = hashLongURL(longURL);

  return res.json({
    longURL,
    dateCreated: urlDataByHash[hashedLongURL].dateCreated,
    accessCount: urlDataByHash[hashedLongURL].accessCount,
    lastTimeAccessed: urlDataByHash[hashedLongURL].lastTimeAccessed,
  });
});

// Get all URL list
app.get("/api/list", (req, res) => {
  const query = req.query.search?.toLowerCase() || "";

  const filteredURLs = Object.entries(urlDataByShortURLPath)
    .filter(([_, data]) => data.longURL.toLowerCase().includes(query))
    .map(([shortURLpath, data]) => {
      const hashedLongURL = hashLongURL(data.longURL);
      const meta = urlDataByHash[hashedLongURL] || {};

      return {
        id: shortURLpath,
        shortURL: meta.shortURL,
        longURL: data.longURL,
        dateCreated: meta.dateCreated,
        accessCount: meta.accessCount,
        lastTimeAccessed: meta.lastTimeAccessed,
      };
    });

  res.json({ filteredURLs });
});

// Encode a URL
app.post("/api/encode", (req, res) => {
  const { longURL } = req.body;

  if (!longURL) {
    return res.status(400).json({ error: "URL is required" });
  }

  const hashedLongURL = hashLongURL(longURL);

  if (urlDataByHash[hashedLongURL]) {
    return res.json({
      longURL,
      shortURL: urlDataByHash[hashedLongURL].shortURL,
      message: "URL has already been encoded!",
    });
  }

  const shortURLpath = truncateHash(hashedLongURL, urlDataByShortURLPath);
  const shortURL = `http://localhost:${PORT}/${shortURLpath}`;
  const dateCreated = new Date().toUTCString();
  const accessCount = 0;
  const lastTimeAccessed = null;

  urlDataByHash[hashedLongURL] = {
    shortURL,
    dateCreated,
    accessCount,
    lastTimeAccessed,
  };

  urlDataByShortURLPath[shortURLpath] = {
    longURL,
  };

  res.json({ longURL, shortURL, message: "URL encoded successfully!" });
});

// Decode a URL
app.post("/api/decode", (req, res) => {
  const { shortURLpath } = req.body;

  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.json({
    longURL: data.longURL,
    message: "URL decoded successfully!",
  });
});

// Redirect shortURL => longURL
app.get("/:shortURLpath", (req, res) => {
  const { shortURLpath } = req.params;

  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  const { longURL } = data;
  const hashedLongURL = hashLongURL(longURL);

  urlDataByHash[hashedLongURL] = {
    ...urlDataByHash[hashedLongURL],
    accessCount: (urlDataByHash[hashedLongURL].accessCount || 0) + 1,
    lastTimeAccessed: new Date().toUTCString(),
  };

  return res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

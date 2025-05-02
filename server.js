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

  if (urlMap[longURL]) {
    return res.json({
      longURL,
      shortURL: urlMap[longURL].shortURL,
      message: "URL already exists",
    });
  }

  const shortURLid = nanoid(6);
  const shortURL = `http://localhost:${PORT}/${shortURLid}`;
  const dateCreated = new Date().toUTCString();
  const accessCount = 0;

  urlMap[longURL] = {
    shortURLid,
    longURL,
    shortURL,
    dateCreated,
    accessCount,
  };

  res.json({ longURL, shortURL });
});

app.get("/myURLs", (req, res) => {
  const query = req.query.search?.toLowerCase() || "";

  const filteredURLs = Object.entries(urlMap)
    .filter(([longURL, data]) => {
      return longURL.toLowerCase().includes(query);
    })
    .map(([longURL, data]) => ({
      ...data,
    }));

  res.json(filteredURLs);
});

app.get("/:shortURLid", (req, res) => {
  const { shortURLid } = req.params;

  const foundObjWithId = Object.entries(urlMap).find(
    ([_, data]) => data.shortURLid === shortURLid
  );

  if (foundObjWithId) {
    foundObjWithId[1].accessCount += 1;
    return res.redirect(foundObjWithId[1].longURL);
  }

  res.status(404).json({ error: "URL not found" });
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

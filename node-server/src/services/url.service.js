import dotenv from "dotenv";
import { urlDataByHash, urlDataByShortURLPath } from "../data/url.store.js";
import isValidURL from "../utils/isValidURL.util.js";
import hashURL from "../utils/hash.util.js";
import truncateHash from "../utils/truncate.util.js";
import findAlternateShortURLs from "../utils/findAlternateShortURLs.util.js";

dotenv.config();
const PORT = process.env.PORT;

export const getURLStatsByShortURLpath = (shortURLpath) => {
  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return { status: 404, error: "URL not found" };
  }

  const hashedLongURL = hashURL(data.longURL);
  const meta = urlDataByHash[hashedLongURL] || {};

  return {
    id: shortURLpath,
    longURL: data.longURL,
    ...meta,
  };
};

export const getAllURLs = (query = "") => {
  const filteredURLs = Object.entries(urlDataByShortURLPath)
    .filter(([_, data]) => data.longURL.toLowerCase().includes(query))
    .map(([shortURLpath, data]) => {
      const hashedLongURL = hashURL(data.longURL);
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

  return {
    total: filteredURLs.length,
    filteredURLs,
  };
};

export const linkCustomURL = async (longURL, customUrl) => {
  if (!longURL) {
    return { status: 400, error: "URL is required" };
  }

  if (!isValidURL(longURL)) {
    return { status: 400, error: "Invalid URL format" };
  }

  if (urlDataByShortURLPath[customUrl]) {
    const alternateShortURLs = await findAlternateShortURLs(customUrl);

    return {
      status: 409,
      error: "Custom URL is already taken!",
      options: alternateShortURLs,
    };
  }

  const hashedLongURL = hashURL(longURL);

  const shortURLpath = customUrl;
  const shortURL = `http://localhost:${PORT}/${shortURLpath}`;
  const dateCreated = urlDataByHash[hashedLongURL]
    ? urlDataByHash[hashedLongURL].dateCreated
    : new Date().toUTCString();

  const dateModified = new Date().toUTCString();
  const accessCount = urlDataByHash[hashedLongURL]
    ? urlDataByHash[hashedLongURL].accessCount
    : 0;

  const lastTimeAccessed = urlDataByHash[hashedLongURL]
    ? urlDataByHash[hashedLongURL].lastTimeAccessed
    : null;

  urlDataByHash[hashedLongURL] = {
    shortURL,
    dateCreated,
    dateModified,
    accessCount,
    lastTimeAccessed,
  };

  urlDataByShortURLPath[shortURLpath] = {
    longURL,
    dateCreated,
  };

  return { longURL, shortURL };
};

export const encodeURL = (longURL) => {
  if (!longURL) {
    return { status: 400, error: "URL is required" };
  }

  if (!isValidURL(longURL)) {
    return { status: 400, error: "Invalid URL format" };
  }

  const hashedLongURL = hashURL(longURL);

  if (urlDataByHash[hashedLongURL]) {
    return {
      longURL,
      shortURL: urlDataByHash[hashedLongURL].shortURL,
    };
  }

  const shortURLpath = truncateHash(hashedLongURL, urlDataByShortURLPath);
  const shortURL = `http://localhost:${PORT}/${shortURLpath}`;
  const dateCreated = new Date().toUTCString();
  const dateModified = new Date().toUTCString();
  const accessCount = 0;
  const lastTimeAccessed = null;

  urlDataByHash[hashedLongURL] = {
    shortURL,
    dateCreated,
    dateModified,
    accessCount,
    lastTimeAccessed,
  };

  urlDataByShortURLPath[shortURLpath] = {
    longURL,
    dateCreated,
  };

  return { longURL, shortURL };
};

export const decodeURL = (shortURL) => {
  if (!isValidURL(shortURL)) {
    return { status: 400, error: "Invalid URL format" };
  }

  const shortURLpath = shortURL.split("/").pop();

  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return { status: 404, error: "URL not found" };
  }

  return { longURL: data.longURL };
};

export const redirectURL = (shortURLpath) => {
  const data = urlDataByShortURLPath[shortURLpath];

  if (!data) {
    return { status: 404, error: "URL not found" };
  }

  const hashedLongURL = hashURL(data.longURL);
  const meta = urlDataByHash[hashedLongURL] || {};

  meta.accessCount += 1;
  meta.lastTimeAccessed = new Date().toUTCString();

  return { longURL: data.longURL };
};

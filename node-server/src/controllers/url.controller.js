import logger from "../logger/url.logger.js";
import {
  getURLStatsByShortURLpath,
  getAllURLs,
  linkCustomURL,
  encodeURL,
  decodeURL,
  redirectURL,
} from "../services/url.service.js";

export const getURLStats = async (req, res) => {
  const { shortURLpath } = req.params;
  logger.info(`Fetching stats for short URL path: ${shortURLpath}`);

  const result = getURLStatsByShortURLpath(shortURLpath);

  if (result.error) {
    logger.error(`Error fetching stats for ${shortURLpath}: ${result.error}`);
    return res.status(result.status).json({ error: result.error });
  }

  logger.info(`Stats for ${shortURLpath} retrieved successfully`);

  return res.status(200).json({
    success: true,
    data: result,
    message: "URL statistics retrieved successfully!",
  });
};

export const getAllURLsList = async (req, res) => {
  const query = req.query.search?.toLowerCase() || "";

  logger.info(`Fetching all URLs with search query: ${query}`);

  const result = getAllURLs(query);

  if (result.error) {
    logger.error(`Error fetching all URLs: ${result.error}`);
    return res.status(result.status).json({ error: result.error });
  }

  logger.info(`All URLs retrieved successfully with ${result.total} results`);

  return res.status(200).json({
    success: true,
    data: result,
    message: "All URLs retrieved successfully!",
  });
};

export const encode = async (req, res) => {
  const { longURL, customUrl } = req.body;

  logger.info(
    customUrl
      ? `Linking custom URL: ${customUrl} to long URL: ${longURL}`
      : `Encoding long URL: ${longURL}`
  );

  const result = customUrl
    ? await linkCustomURL(longURL, customUrl)
    : encodeURL(longURL);

  if (result.error) {
    logger.error(
      `Error ${customUrl ? "linking" : "encoding"} URL: ${result?.error}, ${
        result?.options ? `Options: ${JSON.stringify(result?.options)}` : ""
      }`
    );
    return res
      .status(result.status)
      .json({ error: result.error, options: result.options });
  }

  logger.info(
    `URL ${customUrl ? "linked" : "encoded"} successfully: ${result.shortURL}`
  );

  return res.status(200).json({
    success: true,
    data: result,
    message: `${
      customUrl ? "Custom URL linked" : "Long URL encoded"
    } successfully`,
  });
};

export const decode = async (req, res) => {
  const { shortURL } = req.body;

  logger.info(`Decoding short URL: ${shortURL}`);

  const result = decodeURL(shortURL);

  if (result.error) {
    logger.error(`Error decoding short URL: ${result.error}`);
    return res.status(result.status).json({ error: result.error });
  }

  logger.info(`Short URL decoded successfully: ${result.longURL}`);

  return res.status(200).json({
    success: true,
    data: result,
    message: "URL decoded successfully!",
  });
};

export const redirect = async (req, res) => {
  const { shortURLpath } = req.params;

  logger.info(`Redirecting short URL path: ${shortURLpath}`);

  const result = redirectURL(shortURLpath);

  if (result.error) {
    logger.error(`Error redirecting short URL: ${result.error}`);
    return res.status(result.status).json({ error: result.error });
  }

  logger.info(`Short URL redirected to ${result.longURL} successfully`);

  return res.redirect(result.longURL);
};

export const welcome = async (req, res) => {
  res.send(
    "Welcome to the URL Shortener Service! Visit /api-docs for API documentation."
  );
};

import {
  getURLStatsByShortURLpath,
  getAllURLs,
  linkCustomURL,
  encodeURL,
  decodeURL,
  redirectURL,
} from "../services/url.service.js";

export const getURLStats = (req, res) => {
  const { shortURLpath } = req.params;

  const result = getURLStatsByShortURLpath(shortURLpath);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: "URL statistics retrieved successfully!",
  });
};

export const getAllURLsList = (req, res) => {
  const query = req.query.search?.toLowerCase() || "";

  const result = getAllURLs(query);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: "All URLs retrieved successfully!",
  });
};

export const encode = async (req, res) => {
  const { longURL, customUrl } = req.body;

  const result = customUrl
    ? await linkCustomURL(longURL, customUrl)
    : encodeURL(longURL);

  if (result.error) {
    return res
      .status(result.status)
      .json({ error: result.error, options: result.options });
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: customUrl
      ? "Custom URL linked successfully!"
      : "URL encoded successfully!",
  });
};

export const decode = (req, res) => {
  const { shortURL } = req.body;

  const result = decodeURL(shortURL);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: "URL decoded successfully!",
  });
};

export const redirect = (req, res) => {
  const { shortURLpath } = req.params;

  const result = redirectURL(shortURLpath);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.redirect(result.longURL);
};

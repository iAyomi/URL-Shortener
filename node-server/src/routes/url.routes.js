import express from "express";
import {
  getURLStats,
  getAllURLsList,
  encode,
  decode,
  redirect,
  welcome,
} from "../controllers/url.controller.js";
import {
  // validateGetURLStats,
  validateGetAllURLsList,
  validateEncodeURL,
  validateDecodeURL,
  // validateRedirectURL,
} from "../middleware/url.validate.js";
import {
  // getURLStatsSchema,
  getAllURLsListSchema,
  encodeSchema,
  decodeSchema,
  // redirectSchema,
} from "../schemas/url.schema.js";

const router = express.Router();

// Get URL Stats by shortURLpath
router.get("/api/statistic/:shortURLpath", getURLStats);

// Get all URL list
router.get(
  "/api/list",
  validateGetAllURLsList(getAllURLsListSchema),
  getAllURLsList
);

// Encode a URL
router.post("/api/encode", validateEncodeURL(encodeSchema), encode);

// Decode a URL
router.post("/api/decode", validateDecodeURL(decodeSchema), decode);

// Redirect shortURL => longURL
router.get("/:shortURLpath", redirect);

// Welcome route
router.get("/", welcome);

export default router;

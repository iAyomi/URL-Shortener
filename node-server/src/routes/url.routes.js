import express from "express";
import {
  getURLStats,
  getAllURLsList,
  encode,
  decode,
  redirect,
} from "../controllers/url.controller.js";

const router = express.Router();

// Get URL Stats by shortURLpath
router.get("/api/statistic/:shortURLpath", getURLStats);

// Get all URL list
router.get("/api/list", getAllURLsList);

// Encode a URL
router.post("/api/encode", encode);

// Decode a URL
router.post("/api/decode", decode);

// Redirect shortURL => longURL
router.get("/:shortURLpath", redirect);

export default router;

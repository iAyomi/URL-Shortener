import * as yup from "yup";
import isValidURL from "../utils/isValidURL.util.js";

// export const getURLStatsSchema = yup.object({
//   shortURLpath: yup.string().required("Short URL is required"),
// });

export const getAllURLsListSchema = yup.object({
  search: yup.string(),
});

export const encodeSchema = yup.object({
  longURL: yup
    .string()
    .test("is-url-valid", "Invalid URL format", (value) => isValidURL(value))
    .required("URL is required"),
  customUrl: yup.string().max(7, "Custom URL must be at most 7 characters"),
});

export const decodeSchema = yup.object({
  shortURL: yup
    .string()
    .test("is-url-valid", "Invalid URL format", (value) => isValidURL(value))
    .required("URL is required"),
});

// export const redirectSchema = yup.object({
//   shortURLpath: yup.string(),
// });

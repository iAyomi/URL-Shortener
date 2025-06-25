import app from "../app.js";
import serverless from "serverless-http";

console.log("🚀 Serverless function is loaded!");

export const handler = serverless(app);

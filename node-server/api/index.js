import app from "../src/app.js";
import serverless from "serverless-http";

console.log("🚀 Serverless function is loaded!");

export default serverless(app);

import app from "../app.js";
import serverless from "serverless-http";

console.log("🚀 Serverless function is loaded!");

const handler = serverless(app);

export default handler;

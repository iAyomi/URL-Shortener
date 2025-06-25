import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import logger from "./logger/url.logger.js";
import routes from "./routes/url.routes.js";
import swaggerUi from "swagger-ui-express";

// const swaggerDocument = JSON.parse(
//   fs.readFileSync("./resources/swagger-output.json", "utf-8")
// );

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

// app.use(
//   morgan("combined", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );

// API documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(
    "Welcome to the URL Shortener Service! Visit /api-docs for API documentation."
  );
});

// app.use(routes);

// Error handling in production
app.use((err, req, res, next) => {
  // logger.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

export default app;

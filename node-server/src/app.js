import express from "express";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import logger from "./logger/url.logger.js";
import routes from "./routes/url.routes.js";
import swaggerUi from "swagger-ui-express";

// const swaggerDocument = JSON.parse(
//   fs.readFileSync("./resources/swagger-output.json", "utf-8")
// );

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// API documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

// Error handling in production
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;

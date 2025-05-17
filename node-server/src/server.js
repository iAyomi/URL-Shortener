import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import dotenv from "dotenv";
import routes from "./routes/url.routes.js";

dotenv.config();
const PORT = process.env.PORT;

const swaggerDocument = JSON.parse(
  fs.readFileSync("./resources/swagger-output.json", "utf-8")
);

const app = express();

app.use(cors());
app.use(express.json());

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the URL Shortener Service! Visit /api-docs for API documentation."
  );
});

app.listen(PORT, () => {
  console.log(`URL Shortener Service is running on http://localhost:${PORT}`);
});

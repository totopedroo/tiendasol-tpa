import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import { readFile } from "node:fs/promises";
import YAML from "yaml";

const swaggerDocument = YAML.parse(
  await readFile(new URL("../docs/api-docs.yaml", import.meta.url),  "utf8")
);

export default function swaggerRoutes() {
  const router = express.Router();
  router.use("/api-docs", swaggerUiExpress.serve);
  router.get("/api-docs", swaggerUiExpress.setup(swaggerDocument));
  return router;
}
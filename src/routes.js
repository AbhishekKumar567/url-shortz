import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import createShortUrl from "./controllers/createShortUrl.js";
import redirect from "./controllers/redirect.js";
import getLinks from "./controllers/getLinks.js";
import deleteLink from "./controllers/deleteLink.js";
import getSingleStats from "./controllers/getSingleStats.js";
import health from "./controllers/health.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.redirect("/index.html");
});

router.post("/api/shorten", createShortUrl);
router.get("/api/links", getLinks);
router.delete("/api/delete/:code", deleteLink);
router.get("/api/stats/:code", getSingleStats);
router.get("/healthz", health);

// Serve stats page BEFORE redirect route
router.get("/code/:code", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/code.html"));
});

// Redirect short links
router.get("/:shortCode", redirect);

export default router;

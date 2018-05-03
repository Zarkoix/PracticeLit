import * as express from "express";
import { log } from "winston";
import * as fs from "fs";
import * as path from "path";

const router = express.Router();

const repositoryPath =
  process.env.NODE_ENV === "development" ? "public/repository" : "repository";
const manifestPath = path.resolve(path.join(repositoryPath, "repository.json"));
console.log(path.resolve(""));
const repositoryManifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
log("info", "Repository initialized at " + repositoryPath);

router.get("/", async (req, res) => {
  return res.status(200).json(repositoryManifest);
});

router.get("/:id", (req, res) => {
  const promptPath = path.join(
    repositoryPath,
    "problemPrompts",
    req.params.id + ".html"
  );
  if (fs.existsSync(promptPath)) {
    res.status(200).sendFile(path.resolve(promptPath));
  } else {
    res.status(204).end();
  }
});

export default router;

import express from 'express';
import { log } from 'winston'
import path from 'path'
import fs from 'fs'

const router = express.Router();

const repositoryPath = path.normalize(path.join(__dirname, '../../../../Repository/ExampleRepository'))
const repositoryManifest = JSON.parse(fs.readFileSync(repositoryPath + '/repository.json'))
log('info', 'Repository initialized at ' + repositoryPath)

router.get('/', async (req, res) => {
    return res.status(200).json(repositoryManifest)
})

router.get('/:id', (req, res) => {
  const promptPath = repositoryPath + '/' + req.params.id + '/' + req.params.id + '.html'
  if (fs.existsSync(promptPath)) {
    res.status(200).sendFile(promptPath )
  } else {
    res.status(204).end()
  }
})

export default router;

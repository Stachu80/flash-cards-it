import { Router, Request, Response } from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'

const router = Router()

const serveJsonFile = (fileName: string) => (req: Request, res: Response) => {
  try {
    const dataPath = join(__dirname, '../jsons', fileName)
    const data = readFileSync(dataPath, 'utf-8')
    res.json(JSON.parse(data))
  } catch (error) {
    res.status(500).json({ error: `Failed to read ${fileName}` })
  }
}

// Define routes for each JSON file
router.get('/js', serveJsonFile('js.json'))
router.get('/html', serveJsonFile('html.json'))
router.get('/css', serveJsonFile('css.json'))
router.get('/angular', serveJsonFile('angular.json'))

export default router

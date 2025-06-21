import { createEntry, getAllEntries, getEntryById } from '@/controllers/entry.controller'
import { Router } from 'express'


const router = Router()

router.post('/entries', createEntry)
router.get('/entries',getAllEntries)
router.get('/entries/:id', getEntryById)

export const entryRouter = router
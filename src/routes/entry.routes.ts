import { createEntry, deleteEntryById, getAllEntries, getEntryById } from '@/controllers/entry.controller'
import { Router } from 'express'


const router = Router()

router.post('/entries', createEntry)
router.get('/entries',getAllEntries)
router.get('/entries/:id', getEntryById)
router.delete('/entries/:id',deleteEntryById)

export const entryRouter = router
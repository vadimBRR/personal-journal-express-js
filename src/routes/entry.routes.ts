import { createEntry, getAllEntries } from '@/controllers/entry.controller'
import { Router } from 'express'


const router = Router()

router.post('/entries', createEntry)
router.get('/entries',getAllEntries)

export const entryRouter = router
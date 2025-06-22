import { createEntry, deleteEntryById, getAllEntries, getEntryById, updateById } from '@/controllers/entry.controller'
import { Router } from 'express'


const router = Router()

router.post('/entries', createEntry)
router.get('/entries',getAllEntries)
router.get('/entries/:id', getEntryById)
router.delete('/entries/:id',deleteEntryById)
router.put('/entries/:id',updateById)
export const entryRouter = router
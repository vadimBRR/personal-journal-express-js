import {
	createEntry,
	deleteEntryById,
	getAllEntries,
	getEntryById,
	updateById,
} from '@/controllers/entry.controller'
import { Router } from 'express'

const router = Router()

// create entry
router.post('/entries', createEntry)

// get all entries
router.get('/entries', getAllEntries)

// Get entry by id
router.get('/entries/:id', getEntryById)

// delete entry by id
router.delete('/entries/:id', deleteEntryById)

// update entry by id
router.put('/entries/:id', updateById)
export const entryRouter = router

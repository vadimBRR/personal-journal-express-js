import { createEntry } from '@/controllers/entry.controller'
import { Router } from 'express'


const router = Router()

router.post('/entries', createEntry)

export const entryRouter = router
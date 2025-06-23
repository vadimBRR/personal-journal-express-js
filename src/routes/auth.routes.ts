import { login, register } from '@/controllers/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/register', register)
router.post('/login', login)

export const authRouter = router
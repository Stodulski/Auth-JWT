import { Router } from 'express'

import { signUp, signIn } from '../controllers/user.controllers'

import { verifyToken } from '../controllers/auth.controllers'

const router = Router()
router.get('/', verifyToken)
router.post('/signup', signUp)
router.post('/signin', signIn)

export default router

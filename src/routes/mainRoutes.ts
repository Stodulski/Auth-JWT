import { Router } from 'express'

import deleteUser from '../controllers/user/deleteUser.controller'
import signIn from '../controllers/user/signIn.controller'
import signUp from '../controllers/user/signUp.controller'
import updateUser from '../controllers/user/updateUser.controller'
import getUser from '../controllers/user/getUser.controller'

import { verifyToken } from '../controllers/auth.controllers'

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/user/:userId', getUser)
router.put('/user/:userId', verifyToken, updateUser)
router.delete('/user/:userId', verifyToken, deleteUser)

export default router

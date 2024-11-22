import { Request, Response } from 'express'
import { User } from '../../types'

import { signToken } from '../auth.controllers'
import validateSignIn from '../../utils/validateSignIn'

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEntry: User = req.body
    const validationError = await validateSignIn(userEntry)
    if (typeof validationError === 'string') {
      res.status(400).json({ status: 'Error', message: validationError })
      return
    }
    const token = await signToken(validationError.username, validationError.id)
    if (token === null) throw new Error()
    res.status(200).json({
      status: 'Success',
      message: 'Logged in',
      token: `Bearer ${token}`
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export default signIn

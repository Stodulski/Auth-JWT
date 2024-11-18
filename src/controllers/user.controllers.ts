import { Request, Response } from 'express'
import { UserEntry, User } from '../types'
import { createUser } from '../models/user'
import { encryptPassword } from '../utils/cryptPasswords'
import validateSignUp from '../utils/validateSignUp'
import validateSignIn from '../utils/validateSignIn'
import { signToken } from './auth.controllers'

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEntry: UserEntry = req.body
    const validationError = await validateSignUp(userEntry)
    if (typeof validationError === 'string') {
      res.status(400).json({ status: 'Error', message: validationError })
      return
    }
    const encryptedPassword = await encryptPassword(userEntry.password)
    const userData: User = {
      username: userEntry.username.toLowerCase(),
      email: userEntry.email.toLowerCase(),
      password: encryptedPassword
    }
    const user = await createUser(userData)
    const token = await signToken(user.username, user.id)
    if (token === null) throw new Error()
    res.status(201).json({
      status: 'Success',
      message: 'User created and logged in',
      token: `Bearer ${token}`
    })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

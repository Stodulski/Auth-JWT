import { Request, Response } from 'express'
import { UserEntry, User } from '../../types'
import { createUser } from '../../models/user'
import { signToken } from '../auth.controllers'
import { encryptPassword } from '../../utils/bcrypt'
import validateSignUp from '../../utils/validateSignUp'

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEntry: UserEntry = req.body
    const validationError = await validateSignUp(userEntry)
    if (typeof validationError === 'string') {
      res.status(400).json({ status: 'Error', message: validationError })
      return
    }
    const encryptedPassword = await encryptPassword(
      userEntry.password.toLowerCase()
    )
    const userData: User = {
      username: userEntry.username.toLowerCase(),
      email: userEntry.email.toLowerCase(),
      password: encryptedPassword
    }
    const user = await createUser(userData)
    if (user === null) {
      throw new Error()
    }
    const token = await signToken(user.username, user.id)
    if (token === null) throw new Error()
    res.status(201).json({
      status: 'Success',
      message: 'User created and logged in',
      token: `Bearer ${token}`
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export default signUp

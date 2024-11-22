import { Request, Response } from 'express'
import { User } from '../../types'
import { updateUserById } from '../../models/user'
import { signToken } from '../auth.controllers'
import isValidEmail from '../../utils/isValidEmail'

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEntry: User = req.body
    const userId = req.params.userId
    if (userId !== req.user?.id) {
      res.status(403).json({ status: 'Error', message: 'Unauthorized' })
      return
    }
    if (!isValidEmail(userEntry.email)) {
      res.status(400).json({ status: 'Error', message: 'Email not valid' })
    }
    const isUpdated = await updateUserById(userId, userEntry)
    if (typeof isUpdated === 'string') {
      res.status(400).json({
        status: 'Error',
        message: isUpdated
      })
      return
    }
    const token = await signToken(isUpdated.username, isUpdated.id)
    if (token === null) throw new Error()
    res.status(200).json({
      status: 'Success',
      message: 'User updated successfully',
      token: `Bearer ${token}`
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export default updateUser

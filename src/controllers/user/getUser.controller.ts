import { Request, Response } from 'express'
import { findUserById } from '../../models/user'

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    const user = await findUserById(userId)
    if (user === null) {
      res.status(404).json({ status: 'Error', message: 'User not found' })
      return
    }
    res.status(200).json({
      status: 'Success',
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export default getUser

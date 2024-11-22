import { Request, Response } from 'express'
import { deleteUserById } from '../../models/user'

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    if (userId !== req.user?.id) {
      res.status(403).json({ status: 'Error', message: 'Unauthorized' })
      return
    }
    const deletedUser = await deleteUserById(userId)
    if (deletedUser === null) {
      res.status(400).json({
        status: 'Error',
        message: 'Failed to delete user'
      })
      return
    }
    res.status(200).json({
      status: 'Success',
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
  }
}

export default deleteUser
